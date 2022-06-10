import ChapterBody from './ChapterBody';
import ArticleBody from './ArticleBody';

function AdminBody(props) {
  const { currentIndex, noteOptionsLength, articles, chapters, tagOptions, noteOptions } = props;

  if (currentIndex < noteOptionsLength) {
    return (
      <ChapterBody currentIndex={currentIndex} chapters={chapters} noteOptions={noteOptions} />
    );
  }
  return (
    <ArticleBody
      currentIndex={currentIndex - noteOptionsLength}
      articles={articles}
      tagOptions={tagOptions}
    />
  );
}

export default AdminBody;
