import React from 'react';

export default () => {
  return (
    <div data-test="component-server-error" className="alert alert-danger">
      There was an error retrieving the secret word. Please try again later.
    </div>
  );
};
