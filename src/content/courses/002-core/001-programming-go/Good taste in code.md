Write an article based on this:

https://medium.com/@bartobri/applying-the-linus-tarvolds-good-taste-coding-requirement-99749f37684a


Applying the Linus Torvalds “Good Taste” Coding Requirement
In a recent interview with Linus Torvalds, the creator of Linux, at approximately 14:20 in the interview, he made a quick point about coding with “good taste”. Good taste? The interviewer prodded him for details and Linus came prepared with illustrations.

He presented a code snippet. But this wasn’t “good taste” code. This snippet was an example of poor taste in order to provide some initial contrast.


Poor Taste Code Example
It’s a function, written in C, that removes an object from a linked list. It contains 10 lines of code.

He called attention to the if-statement at the bottom. It was this if-statement that he criticized.

I paused the video and studied the slide. I had recently written code very similar. Linus was effectively saying I had poor taste. I swallowed my pride and continued the video.

Linus explained to the audience, as I already knew, that when removing an object from a linked list, there are two cases to consider. If the object is at the start of the list there is a different process for its removal than if it is in the middle of the list. And this is the reason for the “poor taste” if-statement.

But if he admits it is necessary, then why is it so bad?

Next he revealed a second slide to the audience. This was his example of the same function, but written with “good taste”.