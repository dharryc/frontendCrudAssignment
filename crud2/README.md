# A brief forward

So basically, I didn't read the entire assignment, so I fixed some of the problems first. I've now "un-fixed" those fixes to do this part of the assignment...

## Answers:

- Which updates succeeded, and which failed?
Uther: FAILED
Shadowheart: FAILED
Geralt: FAILED

- What error messages did the backend return?
Uther: Name must be alphanumeric
Shadowheart: Invalid character class
Geralt: Name must be alphanumeric 

- Why might a character be successfully retrieved but rejected when updated?
It looks like it's because ultimately it gets compiled down to js, it doesn't actually do any checking on the get request. It's still doing the checking when you go to update it, and when it gets sent to the backend, hence the faliure there, but it works on the get request.

- How does your React application display API errors?
I use a conditionally rendered errorMessage field, and it renders any time it isn't empty. If it's empty, it renders the real content instead, and if it's got some content, it displays the error.