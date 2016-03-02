Brainstorming
-------------

Wow, `WebWorkers` are great! I feel like moving into a new world full of
possibilities. Let's check some crazy ideas

### Scope

  * Workers can run arbitrary JavaScript
  * Featuring `IndexedDB`, `Fetch`, `WebSocket`, `Worker`, `FileReader`
  * Without access to the DOM, which would be a target to rendering
    improvements
  * Workers won't block the main thread

The previous statements make me think about **doing absolutelly all what is
possible inside workers** and **leave the main threat to the interactions with
the DOM exclusively** powered by a **virtual dom** engine ideally

How to manage the dependencies and inter-process communication are ideal targets
for JavaScript libraries/frameworks
