# Intro to computer systems

### Computer concepts basics

The filesystem

Bash terminal useful commands + filesystem navigation

Files and type of files

XML, YAML, CSV, JSON

Databases are actually files + a backend that manages these

Marshalling / unmarshalling

### Computer concept advanced

how does computer stores information? bit/byte/hex

ASCII charset

What is CRLF and other invisible chars : [https://youtu.be/TtiBhktB4Qg](https://youtu.be/TtiBhktB4Qg)

async vs synchronous (or blocking vs non blocking)

stateful vs stateless: what is state? (DB, file, RAM…)

disk vs ram

how RAM works?

### Intro to networking

**Client/server model:** Example with JS/CSS/HTML.. why you shouldn’t do cart calculation in the Javascript as you can manipulate everything client side, make an example of bad security design

### What is a protocol?

TCP/IP, UDP but even LINE as a protocol, when you send a message, when you read a message, all the information are sent in a format decided by LINE engineers so apps and servers can speak the same language

### Unix/Linux general knowledge

Where does UNIX / Linux come from?

SSH & BASH

SSH keys for remote login / what are SSH key?

Bash scripting

Commands:

— ps command

— htop / top / atop / ...

— aws cli tool

— google cloud cli tool

— install nginx or apache from zero

— install postgresql from zero

— xargs

— find command

— finding a stuck process / stuck IO

— curl

— install SSL on a server

— install LetsEncrypt

— wc command

Students will reject the Unix philosophy unless they understand its power. Thus, it's best to challenge students to complete useful tasks for which Unix has a comparative advantage, such as:

- Find the five folders in a given directory consuming the most space.
- Report duplicate MP3s (by file contents, not file name) on a computer.
- Take a list of names whose first and last names have been lower-cased, and properly recapitalize them.
- Find all words in English that have `x` as their second letter, and `n` as their second-to-last.
- Directly route your microphone input over the network to another computer's speaker.
- Replace all spaces in a filename with underscore for a given directory.
- Report the last ten errant accesses to the web server coming from a specific IP address.