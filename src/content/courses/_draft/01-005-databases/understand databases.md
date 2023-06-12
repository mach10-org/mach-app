### In order to make people understand how a database work, would be great to actually implement one to illustrate all the core concepts: How is the data stored on disk? (row vs. columar), what kind of indexes exists and how they can speed up data retrieval?

We could make analogies with finding books in a library

Examples:

randomly insert 1000000 rows
persist in flat file (row based)
persist in columnar format (disk speed)

how to go fasfer?
indexes
min/max
bloomfilters
bitmap

write an update function for the above

write a lightweight SQL parser for above

make it remotely accessible from TCP