import { Component } from "react";
import "./index.css"

class PythonCourses extends Component{
    render(){
        return(
            <div className="course-content">
                <h1 className="course-nameP">Python</h1>
                <div className="content">
                    <p>
                    Hello, and welcome to Python Basics: A Practical Introduction to
                    Python 3. I hope you’re ready to learn why so many professional and
                    hobbyist developers are drawn to Python and how you can begin
                    using it on your own projects, small and large, right away.<br/>
                    This book is targeted at beginners who either know a little program-
                    ming but not the Python language and ecosystem or are starting fresh
                    with no programming experience whatsoever.<br/>
                    If you don’t have a computer science degree, don’t worry. David, Dan,
                    Joanna, and Fletcher will guide you through the important comput-
                    ing concepts while teaching you the Python basics and, just as impor-
                    tantly, skipping the unnecessary details at first.
                    </p>
                    <h1>Python Is a Full-Spectrum Language</h1>
                    <p>
                    When learning a new programming language, you don’t yet have the
                    experience to judge how well it will serve you in the long run. If you’re
                    considering learning Python, let me assure you that this is a good
                    choice. One key reason is that Python is a full-spectrum language.
                    What do I mean by this? Some languages are very good for beginners.
                    They hold your hand and make programming super easy. We can go
                    to the extreme and look at visual languages such as Scratch.
                    In Scratch, you get blocks that represent programming concepts like
                    variables, loops, method calls, and so on, and you drag and drop them
                    on a visual surface. Scratch may be easy to get started with for sim
                    ple programs, but you cannot build professional applications with it.
                    Name one Fortune 500 company that powers its core business logic
                    with Scratch.<br/>
                    Come up empty? Me too, because that would be insanity.
                    Other languages are incredibly powerful for expert developers. The
                    most popular one in this category is likely C++ and its close relative,
                    C. Whichever web browser you used today was likely written in C or
                    C++. Your operating system running that browser was very likely also
                    built with C/C++. Your favorite first-person shooter or strategy video
                    game? You nailed it: C/C++.<br/>
                    You can do amazing things with these languages, but they are wholly
                    unwelcoming to newcomers looking for a gentle introduction.
                    </p>
                    <strong>
                    You might not have read a lot of C++ code. It can almost make your
                        eyes burn. Here’s an example, a real albeit complex one
                    </strong>
                    <p>
                    Both Scratch and C++ are decidedly not what I would call full-
                    spectrum languages. With Scratch, it’s easy to start, but you have to
                    switch to a “real” language to build real applications. Conversely, you
                    can build real apps with C++, but there’s no gentle on-ramp. You
                    dive headfirst into all the complexity of the language, which exists to
                    support these rich applications.
                    </p>
                    <p>
                    
                        Python, on the other hand, is special. It is a full-spectrum language.
                        We often judge the simplicity of a language based on the Hello, World
                        test. That is, what syntax and actions are necessary to get the language
                        to output Hello, World to the user? In Python, it couldn’t be simpler:
                    </p>
                    <strong>
                    print("Hello, World")
                    </strong>
                    <p>
                    That’s it! However, I find this an unsatisfying test.
                    The Hello, World test is useful but really not enough to show the power
                    or complexity of a language. Let’s try another example. Not every-
                    thing here needs to make total sense—just follow along to get the Zen
                    of it. The book covers these concepts and more as you go through. The
                    next example is certainly something you could write as you get near
                    the end of the book.<br/>
                    Here’s the new test: What would it take to write a program that ac-
                    cesses an external website, downloads the content to your app in mem-
                    ory, then displays a subsection of that content to the user? Let’s try
                    that experiment using Python 3 with the help of the requests package
                    (which needs to be installed—more on that in chapter 12):
                    </p>
                    <p>
                    Python Is Popular
                    You might have heard that Python is popular. It may seem that it
                    doesn’t really matter how popular a language is so long as you can
                    build the app you want to build with it.<br/>
                    But, for better or worse, the popularity of a programming language
                    is a strong indicator of the quality of libraries you’ll have available as
                    well the number of job openings you’ll find. In short, you should tend
                    to gravitate toward more popular technologies as there will be more
                    choices and integrations available.<br/>
                    So, is Python actually that popular? Yes it is. You’ll find a lot of
                    hype and hyperbole, but there are plenty of stats backing this claim.
                    Let’s look at some analytics presented by stackoverflow.com, a popu-
                    lar question-and-answer site for programmers.
                    </p>
                    <strong>
                    We Don’t Need You to Be a Computer Scientist
                    </strong>
                    <p>
                    One other point that I want to emphasize as you start your Python
learning journey is that we don’t need you to be a computer scientist.
If that’s your goal, then great. Learning Python is a powerful step
in that direction. But the invitation to learn programming is often
framed as “We have all these developer jobs going unfilled! We need
software developers!”
That may or may not be true. But, more importantly, programming
(even a little programming) can be a personal superpower for you.
To illustrate this idea, suppose you are a biologist. Should you drop
out of biology and get a job as a front-end web developer? Probably
not. But skills such as the one I opened this foreword with, using re-
quests to get data from the Web, can be incredibly powerful for you as
a biologist.
Rather than manually exporting and scraping data from the Web or
from spreadsheets, you can use Python to scrape thousands of data
sources or spreadsheets in the time it takes you to do just one manually. Python skills can take your biology power and amplify it well
beyond your colleagues’ to make it your superpower
                    </p>
                   <a href = "https://www.bu.edu/lernet/artemis/years/2011/slides/python.pdf">Click Here...</a>
                
                    
                </div>

            </div>
        )
    }
}

export default PythonCourses