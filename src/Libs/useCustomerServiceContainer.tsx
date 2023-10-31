import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFlatArray } from '../Utils/helper';

const useCustomerServiceContainer = (props?: any) => {
  const faq: any[] = useSelector((state: any) => state.faq.data);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [topics, setTopics]: [any[], (d: any[]) => void] = useState(
    getFlatArray(getFlatArray(faq, 'children'), 'children'),
  );
  const [filterTopics, setFilterTopics]: [any[], (d: any[]) => void] = useState([]);
  const [filterKeyword, setFilterKeyword] = useState('');

  useEffect(() => {
    setTopics(getFlatArray(getFlatArray(faq, 'children'), 'children'));
    return () => {};
  }, [faq]);

  const handleSubmit = () => {
    if (searchKeyword) {
      setFilterTopics(
        topics.filter(
          (t) =>
            t.name.toLowerCase().indexOf(searchKeyword.toLocaleLowerCase()) !== -1 ||
            t.content
              .replace(/<[^>]*>?/gm, '')
              .toLowerCase()
              .indexOf(searchKeyword.toLowerCase()) !== -1,
        ),
      );
      setFilterKeyword(searchKeyword);
    }
  };

  return {
    faq,
    searchKeyword,
    setSearchKeyword,
    topics,
    setTopics,
    handleSubmit,
    filterTopics,
    setFilterTopics,
    filterKeyword,
    setFilterKeyword,
  };
};

export default useCustomerServiceContainer;
