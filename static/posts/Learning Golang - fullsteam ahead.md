# Learning Golang - fullsteam ahead (weird way)

This isn't written in any real order and it won't have everything on these items until I actually need them.
These are basically the notes that I did when I was learning this language.

## Maps, Arrays, Slices

**Arrays**
```go
var a1 [5]int; //array of 5 ints
```
* whatever isn't initialized is set to 0 in that type - 0 in int, empty '' in string, remember this as it might come up in loops

**Slices** are array without any size given, and so they can grow as needed
```go
var s1 []int //empty slice with length 0
s2 := make([]string, 3) //if we want a slice with a starting length we need to use the make function, all elements are empty

```
* to add new values you use append

When using slices you can easily create a slice of a slice
```go
s3 := s1[3:6] //from 3-rd to 6-th element of a slice - length of the new slice is 3, and the capacity is 6
s4 := s1[:3] //from the first element to the 3-rd
s5 := s1[3:] //from the third element to the end
```
* slices can have different capacities and length, they do not need to be always the same - using 3:6 creates a 3 lenthg slice with capacity of 6 - first 3 elements are empty

If you need you can use s1... to unpack the slice and get the straight values

**Maps** are basically associated arrays or dictionaries - key, value arrays
```go
m1 := make(map[string]int) //string keys, int values
m1["one"] = 1
```
* you can delete stuff using delete(map, key)
