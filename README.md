# TheTimes

I haven't quite followed the instructions.

The app only puts an article into the database when you ask it to.

The "Add a note" button changes to "Edit note" if there is already a note attached to the article.  In order to avoid having to "make a trip" to the server to fetch a note when the user clicks Edit Note the app sends stored notes down to the client in hidden divs.  The client can then recover that information and put it in the edit note modal.

The "Save" button does not appear if the article is already in the database and the note has not been changed.

Adding / editing a note does not automatically save the article.  It does make the "Save" button reappear.

