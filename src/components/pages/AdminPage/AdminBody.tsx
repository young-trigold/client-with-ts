import ChapterBody from './ChapterBody';
import ArticleBody from './ArticleBody';
import { ArticleInfo } from '../HomePage/HomePage';
import { ChapterInfo } from '../ChapterListPage/ChapterListPage';
import { NoteOption } from './AdminPage';

export interface AdminBodyProps {
  currentIndex: number;
  noteOptionsLength: number;
  articles: ArticleInfo[][];
  chapters: ChapterInfo[][];
  tagOptions: string[];
  noteOptions: NoteOption[];
}

function AdminBody(props: AdminBodyProps) {
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
