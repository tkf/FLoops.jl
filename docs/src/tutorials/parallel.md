# Parallel loop

Parallel loops require additional syntax `@reduce`.

```julia
julia> @floop for (x, y) in zip(1:3, 1:2:6)
           a = x + y
           b = x - y
           @reduce(s += a, t += b)
       end
       (s, t)
(15, -3)
```

Use `acc = op(init, x)` to specify that the identity element for the
binary function `op` is `init`:

```julia
julia> using BangBang  # for `append!!`

julia> using MicroCollections  # for `EmptyVector` and `SingletonVector`

julia> @floop for x in 1:5
           ys = SingletonVector(x)
           if isodd(x)
               @reduce(odds = append!!(EmptyVector(), ys))
           else
               @reduce(evens = append!!(EmptyVector(), ys))
           end
       end
       (odds, evens)
([1, 3, 5], [2, 4])
```

When `op` is a binary operator, the infix syntax `acc = init op x` can
also be used:

```julia
julia> @floop for (x, y) in zip(1:3, 1:2:6)
           a = x + y
           b = x - y
           @reduce(s = 0im + a, t = 0im + b)
       end
       (s, t)
(15 + 0im, -3 + 0im)
```

**NOTE**: In the above examples, statements like `odds =
append!!(EmptyVector(), ys)` and `s = 0im + a` are *not* evaluated for
each iteration.  These statements as-is are evaluated only for the
first iteration (for each basecase) and then the expressions where the
first argument is replaced by the corresponding LHS, i.e., `odds =
append!!(odds, ys)` and `s = s + a`, are evaluated for the bulk of the
loop.

For more complex reduction, use `@reduce() do` syntax:

```julia
julia> @floop for (i, v) in pairs([0, 1, 3, 2]), (j, w) in pairs([3, 1, 5])
           d = abs(v - w)
           @reduce() do (dmax = -1; d), (imax = 0; i), (jmax = 0; j)
               if isless(dmax, d)
                   dmax = d
                   imax = i
                   jmax = j
               end
           end
       end
       (dmax, imax, jmax)
(5, 1, 3)
```

When reading code with `@reduce() do`, a quick way to understand it is
to mentally comment out the line with `@reduce() do` and the
corresponding `end`.  To get a full picture, move the initialization
parts (in the above example, `dmax = -1`, `imax = 0`, and `jmax = 0`)
to outside `for` loop:

```julia
julia> let
           dmax = -1  # -+
           imax = 0   #  | initializers
           jmax = 0   # -+
           for (i, v) in pairs([0, 1, 3, 2]), (j, w) in pairs([3, 1, 5])
               d = abs(v - w)
               if isless(dmax, d)  # -+
                   dmax = d        #  | `do` block body
                   imax = i        #  |
                   jmax = j        #  |
               end                 # -+
           end
           (dmax, imax, jmax)
       end
(5, 1, 3)
```

This exact transformation is used for defining the sequential
basecase.  Consecutive basecases are combined using the code in the
`do` block body.

Control flow syntaxes such as `continue`, `break`, `return`, and
`@goto` work with parallel loops:

```julia
julia> @floop for x in 1:10
           y = 2x
           @reduce() do (s; y)
               s = y
           end
           x == 3 && break
       end
       s
6
```

`@reduce` can be used multiple times in a loop body

```julia
julia> @floop for (i, v) in pairs([0, 1, 3, 2])
           y = 2v
           @reduce() do (ymax; y), (imax; i)
               if isless(ymax, y)
                   ymax = y
                   imax = i
               end
           end
           @reduce() do (ymin; y), (imin; i)
               if isless(y, ymin)
                   ymin = y
                   imin = i
               end
           end
       end
       (ymax, imax), (ymin, imin)
((6, 3), (0, 1))
```

`@floop` with `@reduce` can take optional executor argument (default
to `ThreadedEx()`) to specify one of sequential, threaded and
distributed execution strategies and the parameters of the strategy:

```julia
julia> function demo(executor)
           @floop executor for x in 1:10
               @reduce(s += x)
           end
           return s
       end;

julia> demo(SequentialEx(simd = Val(true)))
55

julia> demo(ThreadedEx(basesize = 2))
55

julia> demo(DistributedEx(threads_basesize = 2))
55
```