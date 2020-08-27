var documenterSearchIndex = {"docs":
[{"location":"howto/parallel/","page":"How to do X in parallel?","title":"How to do X in parallel?","text":"EditURL = \"https://github.com/JuliaFolds/FLoops.jl/blob/master/examples/howto/parallel.jl\"","category":"page"},{"location":"howto/parallel/#How-to-write-*X*-in-parallel.","page":"How to do X in parallel?","title":"How to write X in parallel.","text":"","category":"section"},{"location":"howto/parallel/","page":"How to do X in parallel?","title":"How to do X in parallel?","text":"using FLoops","category":"page"},{"location":"howto/parallel/","page":"How to do X in parallel?","title":"How to do X in parallel?","text":"warning: Warning\nThis page is still work-in-progress.","category":"page"},{"location":"howto/parallel/#In-place-mutation","page":"How to do X in parallel?","title":"In-place mutation","text":"","category":"section"},{"location":"howto/parallel/","page":"How to do X in parallel?","title":"How to do X in parallel?","text":"Mutable containers can be allocated in the init expressions (zeros(3) in the example below):","category":"page"},{"location":"howto/parallel/","page":"How to do X in parallel?","title":"How to do X in parallel?","text":"@floop for x in 1:10\n    xs = [x, 2x, 3x]\n    @reduce() do (ys = zeros(3); xs)\n        ys .+= xs\n    end\nend\nys","category":"page"},{"location":"howto/parallel/","page":"How to do X in parallel?","title":"How to do X in parallel?","text":"Mutating objects allocated in the init expressions is not data race because each basecase \"owns\" such mutable objects.  However, it is incorrect to mutate objects created outside init expressions.","category":"page"},{"location":"howto/parallel/","page":"How to do X in parallel?","title":"How to do X in parallel?","text":"note: Note\nTechnically, it is correct to mutate objects in the loop body if the objects are protected by a lock.  However, it means that the code block protected by the lock can be executed by a single task.  For efficient data parallel loops, it is highly recommended to use non-thread-safe data collection (i.e., no lock) and construct the @reduce block that efficiently merge two mutable objects.","category":"page"},{"location":"howto/parallel/#INCORRECT-EXAMPLE","page":"How to do X in parallel?","title":"INCORRECT EXAMPLE","text":"","category":"section"},{"location":"howto/parallel/","page":"How to do X in parallel?","title":"How to do X in parallel?","text":"This example has data race because the array ys0 is shared across all base cases and mutated in parallel.","category":"page"},{"location":"howto/parallel/","page":"How to do X in parallel?","title":"How to do X in parallel?","text":"ys0 = zeros(3)\n@floop for x in 1:10\n    xs = [x, 2x, 3x]\n    @reduce() do (ys = ys0; xs)\n        ys .+= xs\n    end\nend","category":"page"},{"location":"howto/parallel/","page":"How to do X in parallel?","title":"How to do X in parallel?","text":"","category":"page"},{"location":"howto/parallel/","page":"How to do X in parallel?","title":"How to do X in parallel?","text":"This page was generated using Literate.jl.","category":"page"},{"location":"reference/reduction/","page":"Parallelizable reduction (WIP)","title":"Parallelizable reduction (WIP)","text":"EditURL = \"https://github.com/JuliaFolds/FLoops.jl/blob/master/examples/reference/reduction.jl\"","category":"page"},{"location":"reference/reduction/#Parallelizable-reduction-using-@reduce","page":"Parallelizable reduction (WIP)","title":"Parallelizable reduction using @reduce","text":"","category":"section"},{"location":"reference/reduction/","page":"Parallelizable reduction (WIP)","title":"Parallelizable reduction (WIP)","text":"warning: Warning\nThis page is still work-in-progress.","category":"page"},{"location":"reference/reduction/","page":"Parallelizable reduction (WIP)","title":"Parallelizable reduction (WIP)","text":"using FLoops","category":"page"},{"location":"reference/reduction/#ref-reduce-do","page":"Parallelizable reduction (WIP)","title":"@reduce() do ... end syntax","text":"","category":"section"},{"location":"reference/reduction/","page":"Parallelizable reduction (WIP)","title":"Parallelizable reduction (WIP)","text":"@floop for x in 1:10\n    y = 2x\n    @reduce() do (acc; y)\n        acc += y\n    end\nend\nacc","category":"page"},{"location":"reference/reduction/#Argument-symbols-must-be-unique-within-a-@reduce-block","page":"Parallelizable reduction (WIP)","title":"Argument symbols must be unique within a @reduce block","text":"","category":"section"},{"location":"reference/reduction/","page":"Parallelizable reduction (WIP)","title":"Parallelizable reduction (WIP)","text":"err = try @eval begin # hide\n@floop for x in 1:10\n    @reduce() do (a; x), (b; x)\n        a += x\n        b *= x\n    end\nend\nend catch _err; _err; end # hide\nprint(stdout, \"ERROR: \") # hide\nshowerror(stdout, err) # hide","category":"page"},{"location":"reference/reduction/","page":"Parallelizable reduction (WIP)","title":"Parallelizable reduction (WIP)","text":"# TODO: @reduce(a += x, b *= x) should work\n#\n# # Note that `op=` syntax does not have this restriction:\n#\n# @test begin\n#     @floop for x in 1:10\n#         @reduce(a += x, b *= x)\n#     end\n#     (a, b)\n# end == (55, 3628800)","category":"page"},{"location":"reference/reduction/","page":"Parallelizable reduction (WIP)","title":"Parallelizable reduction (WIP)","text":"The argument should be manually duplicated when using the same variable that would be merged into multiple accumulators:","category":"page"},{"location":"reference/reduction/","page":"Parallelizable reduction (WIP)","title":"Parallelizable reduction (WIP)","text":"@floop for x in 1:10\n    y = x\n    @reduce() do (a; x), (b; y)\n        a += x\n        b *= y\n    end\nend\n(a, b)","category":"page"},{"location":"reference/reduction/","page":"Parallelizable reduction (WIP)","title":"Parallelizable reduction (WIP)","text":"If two accumulators do not interact as in the case above, it is recommended to use two @reduce() do blocks to clarify that they are independent reductions:","category":"page"},{"location":"reference/reduction/","page":"Parallelizable reduction (WIP)","title":"Parallelizable reduction (WIP)","text":"@floop for x in 1:10\n    @reduce() do (a; x)\n        a += x\n    end\n    @reduce() do (b; x)\n        b *= x\n    end\nend\n(a, b)","category":"page"},{"location":"reference/reduction/","page":"Parallelizable reduction (WIP)","title":"Parallelizable reduction (WIP)","text":"","category":"page"},{"location":"reference/reduction/","page":"Parallelizable reduction (WIP)","title":"Parallelizable reduction (WIP)","text":"This page was generated using Literate.jl.","category":"page"},{"location":"","page":"FLoops.jl","title":"FLoops.jl","text":"CurrentModule = FLoops","category":"page"},{"location":"#FLoops.jl","page":"FLoops.jl","title":"FLoops.jl","text":"","category":"section"},{"location":"","page":"FLoops.jl","title":"FLoops.jl","text":"","category":"page"},{"location":"","page":"FLoops.jl","title":"FLoops.jl","text":"FLoops","category":"page"},{"location":"#FLoops.FLoops","page":"FLoops.jl","title":"FLoops.FLoops","text":"FLoops: fold for humans™\n\n(Image: Dev) (Image: GitHub Actions)\n\nFLoops.jl provides a macro @floop.  It can be used to generate a fast generic iteration over complex collections.\n\nUsage\n\nSequential (single-thread) loop\n\nSimply wrap a for loop and its initialization part by @floop:\n\njulia> using FLoops  # exports @floop macro\n\njulia> @floop begin\n           s = 0\n           for x in 1:3\n               s += x\n           end\n       end\n       s\n6\n\nWhen accumulating into pre-defined variables, simply list them between begin and for.  @floop also works with multiple accumulators.\n\njulia> @floop begin\n           s\n           p = 1\n           for x in 4:5\n               s += x\n               p *= x\n           end\n       end\n       s\n15\n\njulia> p\n20\n\nThe begin ... end block can be omitted if the for loop does not require local variables to carry the state:\n\njulia> @floop for x in 1:3\n           @show x\n       end\nx = 1\nx = 2\nx = 3\n\nParallel (multi-thread) loop\n\nParallel loops require additional syntax @reduce.\n\njulia> @floop for (x, y) in zip(1:3, 1:2:6)\n           a = x + y\n           b = x - y\n           @reduce(s += a, t += b)\n       end\n       (s, t)\n(15, -3)\n\nUse acc = op(init, x) to specify that the identity element for the binary function op is init:\n\njulia> using BangBang  # for `append!!`\n\njulia> using MicroCollections  # for `EmptyVector` and `SingletonVector`\n\njulia> @floop for x in 1:5\n           ys = SingletonVector(x)\n           if isodd(x)\n               @reduce(odds = append!!(EmptyVector(), ys))\n           else\n               @reduce(evens = append!!(EmptyVector(), ys))\n           end\n       end\n       (odds, evens)\n([1, 3, 5], [2, 4])\n\nWhen op is a binary operator, the infix syntax acc = init op x can also be used:\n\njulia> @floop for (x, y) in zip(1:3, 1:2:6)\n           a = x + y\n           b = x - y\n           @reduce(s = 0im + a, t = 0im + b)\n       end\n       (s, t)\n(15 + 0im, -3 + 0im)\n\nNOTE: In the above examples, statements like odds = append!!(EmptyVector(), ys) and s = 0im + a are not evaluated for each iteration.  These statements as-is are evaluated only for the first iteration (for each basecase) and then the expressions where the first argument is replaced by the corresponding LHS, i.e., odds = append!!(odds, ys) and s = s + a, are evaluated for the bulk of the loop.\n\nFor more complex reduction, use @reduce() do syntax:\n\njulia> @floop for (i, v) in pairs([0, 1, 3, 2]), (j, w) in pairs([3, 1, 5])\n           d = abs(v - w)\n           @reduce() do (dmax = -1; d), (imax = 0; i), (jmax = 0; j)\n               if isless(dmax, d)\n                   dmax = d\n                   imax = i\n                   jmax = j\n               end\n           end\n       end\n       (dmax, imax, jmax)\n(5, 1, 3)\n\nWhen reading code with @reduce() do, a quick way to understand it is to mentally comment out the line with @reduce() do and the corresponding end.  To get a full picture, move the initialization parts (in the above example, dmax = -1, imax = 0, and jmax = 0) to outside for loop:\n\njulia> let\n           dmax = -1  # -+\n           imax = 0   #  | initializers\n           jmax = 0   # -+\n           for (i, v) in pairs([0, 1, 3, 2]), (j, w) in pairs([3, 1, 5])\n               d = abs(v - w)\n               if isless(dmax, d)  # -+\n                   dmax = d        #  | `do` block body\n                   imax = i        #  |\n                   jmax = j        #  |\n               end                 # -+\n           end\n           (dmax, imax, jmax)\n       end\n(5, 1, 3)\n\nThis exact transformation is used for defining the sequential basecase.  Consecutive basecases are combined using the code in the do block body.\n\nControl flow syntaxes (see below) such as continue, break, return, and @goto work with parallel loops:\n\njulia> @floop for x in 1:10\n           y = 2x\n           @reduce() do (s; y)\n               s = y\n           end\n           x == 3 && break\n       end\n       s\n6\n\n@reduce can be used multiple times in a loop body\n\njulia> @floop for (i, v) in pairs([0, 1, 3, 2])\n           y = 2v\n           @reduce() do (ymax; y), (imax; i)\n               if isless(ymax, y)\n                   ymax = y\n                   imax = i\n               end\n           end\n           @reduce() do (ymin; y), (imin; i)\n               if isless(y, ymin)\n                   ymin = y\n                   imin = i\n               end\n           end\n       end\n       (ymax, imax), (ymin, imin)\n((6, 3), (0, 1))\n\n@floop with @reduce can take optional executor argument (default to ThreadedEx()) to specify one of sequential, threaded and distributed execution strategies and the parameters of the strategy:\n\njulia> function demo(executor)\n           @floop executor for x in 1:10\n               @reduce(s += x)\n           end\n           return s\n       end;\n\njulia> demo(SequentialEx(simd = Val(true)))\n55\n\njulia> demo(ThreadedEx(basesize = 2))\n55\n\njulia> demo(DistributedEx(threads_basesize = 2))\n55\n\nHow it works\n\n@floop works by converting the native Julia for loop syntax to foldl defined by Transducers.jl.  Unlike foldl defined in Base, foldl defined by Transducers.jl is powerful enough to cover the for loop semantics and more.\n\nSupported syntaxes\n\ncontinue\n\njulia> @floop for x in 1:3\n           if x == 1\n               println(\"continue\")\n               continue\n           end\n           @show x\n       end\ncontinue\nx = 2\nx = 3\n\nbreak\n\njulia> @floop for x in 1:3\n           @show x\n           if x == 2\n               println(\"break\")\n               break\n           end\n       end\nx = 1\nx = 2\nbreak\n\nreturn\n\njulia> function demo()\n           @floop for x in 1:3\n               @show x\n               if x == 2\n                   return \"return\"\n               end\n           end\n       end\n       demo()\nx = 1\nx = 2\n\"return\"\n\n@goto\n\njulia> begin\n       @floop for x in 1:3\n           x == 1 && @goto L1\n           @show x\n           if x == 2\n               @goto L2\n           end\n           @label L1\n       end\n       println(\"This is not going to be printed.\")\n       @label L2\n       println(\"THIS is going to be printed.\")\n       end\nx = 2\nTHIS is going to be printed.\n\n\n\n\n\n","category":"module"},{"location":"#@floop","page":"FLoops.jl","title":"@floop","text":"","category":"section"},{"location":"","page":"FLoops.jl","title":"FLoops.jl","text":"FLoops.@floop","category":"page"},{"location":"#FLoops.@floop","page":"FLoops.jl","title":"FLoops.@floop","text":"@floop begin\n    s₁ = initialization of s₁\n    s₂  # pre-initialized variable\n    ...\n    for x in xs, ...\n        ...\n    end\nend\n\n@floop begin ... end expects a (possibly empty) series of assignments or variable declaration (as in s₂ above) followed by a for loop.\n\nWhen there is no induction variables, begin ... end can be omitted:\n\n@floop for x in xs, ...\n    ...\nend\n\nUse @reduce for parallel execution:\n\n@floop for x in xs, ...\n    ...\n    @reduce ...\nend\n\n@floop can also take an executor argument (which should be an instance of one of SequentialEx, ThreadedEx and DistributedEx):\n\n@floop executor for x in xs, ...\n    ...\n    @reduce ...\nend\n\nSee the module docstring of Floops for examples.\n\n\n\n\n\n","category":"macro"},{"location":"#@reduce","page":"FLoops.jl","title":"@reduce","text":"","category":"section"},{"location":"","page":"FLoops.jl","title":"FLoops.jl","text":"FLoops.@reduce","category":"page"},{"location":"#FLoops.@reduce","page":"FLoops.jl","title":"FLoops.@reduce","text":"@reduce() do (acc₁ [= init₁]; x₁), ..., (accₙ [= initₙ]; xₙ)\n    ...\nend\n@reduce(acc₁ op₁= x₁, ..., accₙ opₙ= xₙ)\n@reduce(acc₁ = op₁(init₁, x₁), ..., accₙ = opₙ(initₙ, xₙ))\n\nDeclare how accumulators are updated in the sequential basecase and how the resulting accumulators from two basecases are combined.\n\nThe arguments accᵢ and xᵢ must be symbols except for xᵢ of the last two forms in which an expression can be used at xᵢ.\n\nIn the first form,\n\nfunction ((acc₁, acc₂, ..., accₙ), (x₁, x₂, ..., xₙ))\n    ...  # body of the `do` block\n    return (acc₁, acc₂, ..., accₙ)\nend\n\nshould be an associative function.\n\nIn the last two forms, every opᵢ should be an associative function.\n\nIf initᵢ is specified, the tuple (init₁, init₂, ..., initₙ) should be the identify of the related associative function.  accᵢ = initᵢ is evaluated for each basecase (each Task) in the beginning.\n\nConsider a loop with the following form\n\n@floop for ...\n    # code computing (x₁, x₂, ..., xₙ)\n    @reduce() do (acc₁ = init₁; x₁), ..., (accₙ = initₙ; xₙ)\n        # code updating (acc₁, acc₂, ..., accₙ) using (x₁, x₂, ..., xₙ)\n    end\nend\n\nThis is converted to\n\nacc₁ = init₁\n...\naccₙ = initₙ\nfor ...\n    # code computing (x₁, x₂, ..., xₙ)\n    # code updating (acc₁, acc₂, ..., accₙ) using (x₁, x₂, ..., xₙ)\nend\n\nfor computing (acc₁, acc₂, ..., accₙ) of each basecase.  The accumulators accᵢ of two basecases are combined using \"code updating (acc₁, acc₂, ..., accₙ) using (x₁, x₂, ..., xₙ)\" where (x₁, x₂, ..., xₙ) are replaced with (acc₁, acc₂, ..., accₙ) of the next basecase.  Note that \"code computing (x₁, x₂, ..., xₙ)\" is not used for combining the basecases.\n\nExamples\n\n@reduce() do (vmax=-Inf; v), (imax=0; i)\n    if isless(vmax, v)\n        vmax = v\n        imax = i\n    end\nend\n\n@reduce(s += y, p *= y)\n\n@reduce(xs = append!!(EmptyVector(), x), ys = append!!(EmptyVector(), y))\n\n\n\n\n\n","category":"macro"},{"location":"#SequentialEx,-ThreadedEx-and-DistributedEx-executors","page":"FLoops.jl","title":"SequentialEx, ThreadedEx and DistributedEx executors","text":"","category":"section"},{"location":"","page":"FLoops.jl","title":"FLoops.jl","text":"FLoops.ThreadedEx","category":"page"},{"location":"#FLoops.ThreadedEx","page":"FLoops.jl","title":"FLoops.ThreadedEx","text":"SequentialEx(; kwargs...)\nThreadedEx(; kwargs...)\nDistributedEx(; kwargs...)\n\nSequential, threaded, and distributed executor.  An executor specifies execution strategy and its parameters.\n\nSee foldxl, foldxt and foldxd for usable keyword arguments.\n\n\n\n\n\n","category":"type"}]
}
