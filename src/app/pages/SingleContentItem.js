import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchItem } from '../modules/api';

import Spinner from '../components/Spinner';

function validateContentId(id) {
  return !!id.match(/(\w{6}-.*-\w{6})/g);
}

function SingleContentItem() {
  const { id } = useParams();
  const history = useHistory();

  const [state, setState] = useState({ isLoaded: false, item: {}, error: null });

  useEffect(() => {
    if (validateContentId(id)) {
      fetchItem(id)
        .then(item => {
          setState({ isLoaded: true, item });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      history.push('/content');
    }
  }, [id, history]);

  return !state.isLoaded ? <Spinner /> : <div>{state.item.title}</div>;
}

export default SingleContentItem;
