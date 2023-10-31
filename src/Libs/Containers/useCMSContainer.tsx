import FormBuilder from '@langleyfoxall/react-dynamic-form-builder';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCMSDetailReset } from '../../Redux/CMS/actions';
import { saveFormCMSAPI } from '../../Redux/CMS/api';
import { deepClone, removeEmpty, trimString } from '../../Utils';

export interface CMSContainerProps {
  config?: any;
  hooks?: {
    htmlParserReplace?: (d?: any) => any;
  };
}

const useCMSContainer = (props: CMSContainerProps) => {
  const { config, hooks = {} } = props;

  const getCMSContent = (CMSDetail: any, registeredUser: { firstName: any; lastName: any }) => {
    let content = CMSDetail.content;
    if (registeredUser) {
      content = content.replace('###BILLING_FIRST_NAME###', registeredUser.firstName);
      content = content.replace('###BILLING_LAST_NAME###', registeredUser.lastName);
    }
    // Below logic for multiple variables
    const count = (content.match(/###STORE_NAME###/g) || []).length;
    if (count > 0) {
      // tslint:disable-next-line:no-increment-decrement
      for (let i = 0; i < count; i++) {
        content = content.replace('###STORE_NAME###', config.SHOP_INFO.NAME);
      }
    }
    return content;
  };

  const {
    CMSDetail,
  }: {
    CMSDetail: any;
  } = useSelector((state: any) => ({
    CMSDetail: state.CMSDetail && state.CMSDetail.data,
  }));
  const dispatch = useDispatch();
  const [{ registeredUser }]: any = useCookies(['registeredUser']);
  const [dynamicRef, setDynamicRef] = useState({});
  const ReCaptchaRef = useRef(null);

  useEffect(() => {
    import('react-google-recaptcha').then((d) => {
      if (d && d.default) {
        ReCaptchaRef.current = d.default;
      }
    });
    return () => {
      dispatch(fetchCMSDetailReset());
    };
  }, []);

  const [forms, setForms] = useState(
    (CMSDetail.formData &&
      Object.keys(CMSDetail.formData).map((f) => ({
        key: `###${f}###`,
        name: f,
        submitted: false,
      }))) ||
      [],
  );

  const handleSubmit = async (values, index) => {
    try {
      if (values && index !== -1) {
        const formData = CMSDetail.formData[forms[index].name];
        const payload = {
          cmsId: formData.cmsId,
          slug: formData.cmsSlug,
          formName: formData.formName,
          formData: values,
        };
        const res = await saveFormCMSAPI(payload);
        if (res && res.success) {
          setForms((oldForms) => {
            const updatedForms = deepClone(oldForms);
            updatedForms[index].submitted = true;
            return updatedForms;
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const htmlParserReplace = (parseData) => {
    if (parseData && parseData.data) {
      const index = forms.map((f) => f.key).indexOf(trimString(parseData.data));
      if (
        parseData &&
        index !== -1 &&
        CMSDetail.formData[forms[index].name] &&
        CMSDetail.formData[forms[index].name].form
      ) {
        return (
          <>
            {forms[index].submitted && CMSDetail.formData[forms[index].name].successMessage && (
              <p className="text-success text-center">{CMSDetail.formData[forms[index].name].successMessage}</p>
            )}
            <FormBuilder
              form={CMSDetail.formData[forms[index].name].form.map((f) => {
                if (f.name === 'bvb_recaptcha') {
                  return {
                    ...f,
                    render: useMemo(
                      () => (d) => {
                        if (!(ReCaptchaRef && ReCaptchaRef.current)) {
                          return null;
                        }

                        return (
                          <ReCaptchaRef.current
                            ref={(r) => {
                              setDynamicRef((ref) => {
                                ref[`${forms[index].name}_${f.name}`] = r;
                                return ref;
                              });
                            }}
                            {...d.recaptchaData}
                            onErrored={(e) => {
                              console.log(`onErrored`, e);
                            }}
                          />
                        );
                      },
                      [ReCaptchaRef],
                    ),
                  };
                }
                return f;
              })}
              onSubmit={async (d) => {
                if (d && d.valid && d.data && d.data.form && !forms[index].submitted) {
                  let token = null;
                  if (dynamicRef && dynamicRef[`${forms[index].name}_bvb_recaptcha`]) {
                    try {
                      token = await dynamicRef[`${forms[index].name}_bvb_recaptcha`].executeAsync();
                    } catch (e) {
                      console.log(e);
                    }
                    if (!token) {
                      return null;
                    }
                  }
                  handleSubmit(
                    removeEmpty({
                      ...d.data.form,
                      // eslint-disable-next-line @typescript-eslint/camelcase
                      bvb_recaptcha: token,
                    }),
                    index,
                  );
                }
              }}
              submitButton={{
                text: CMSDetail.formData[forms[index].name].submitLabel
                  ? CMSDetail.formData[forms[index].name].submitLabel
                  : 'Submit',
              }}
            />
          </>
        );
      }
    }
    if (hooks && typeof hooks.htmlParserReplace === 'function') {
      return hooks.htmlParserReplace(parseData);
    }
  };

  return {
    CMSDetail,
    registeredUser,
    getCMSContent,
    dynamicRef,
    setDynamicRef,
    forms,
    setForms,
    handleSubmit,
    htmlParserReplace,
  };
};

export default useCMSContainer;
