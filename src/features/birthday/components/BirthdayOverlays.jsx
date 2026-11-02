import BookViewer from './BookViewer';
import CardComposer from './CardComposer';
import ReportModal from './ReportModal';

/** Renders whichever birthday overlays are open (my book under the report dialog; the composer on its own). */
export default function BirthdayOverlays({ o }) {
  return (
    <>
      {o.book && (
        <BookViewer
          key={o.bookId}
          bookId={o.bookId}
          book={o.book}
          cardsOpen={o.settings.open}
          onClose={o.closeBook}
          onHide={o.hideCard}
          onRead={o.readCard}
          onReport={o.openReport}
          onUnlock={o.unlock}
        />
      )}
      {o.composer && (
        <CardComposer key={o.composer.key} initial={o.composer.initial} dateTxt={o.composer.dateTxt} onClose={o.closeCard} onSend={o.sendCard} />
      )}
      {o.report && <ReportModal card={o.report} onClose={o.closeReport} onSend={o.sendReport} />}
    </>
  );
}
