import React from 'react';
import Spinner from '../Spinner';
import MovieCard from '../MovieCard';

function Movies({ items, loading, children }) {
  return (
    <>
      {' '}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="posters">
            {items.length && items.map(item => <MovieCard key={item.id} {...item} />)}
          </div>
          {children}
        </>
      )}
    </>
  );
}

export default Movies;
