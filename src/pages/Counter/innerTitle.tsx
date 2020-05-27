import React, { memo } from "react";
import DocumentTitle from "react-document-title";
// import DocumentTitle from '../../components/documentTitle/react-document-title';

interface TitleInnerProps {}
const TitleInner = memo(() => {
  return (
    <DocumentTitle title="内部标题">
      <div>fdfd</div>
    </DocumentTitle>
  );
});

export default TitleInner;
