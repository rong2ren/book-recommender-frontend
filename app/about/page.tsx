"use client";

export default function About() {
    return (
        <div>
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 animate-fadeIn">
                    <h1 className="text-3xl font-bold mb-6 text-gradient">About PageTurn AI</h1>

                    <div className="space-y-6">
                        <p className="text-lg">
                            PageTurn AI is an intelligent book recommendation system designed to help you discover your next favorite read.
                        </p>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gradient">How It Works</h2>

                        <div className="pl-4 border-l-4 border-blue-500">
                            <h3 className="font-semibold mb-2">Natural Language Understanding</h3>
                            <p>Unlike traditional recommendation systems that rely on tags or categories, PageTurn AI understands natural language queries. This means you can describe what you&apos;re looking for in your own words, just as you would to a librarian or bookstore employee.</p>
                        </div>

                        <div className="pl-4 border-l-4 border-blue-500 animate-float">
                            <h3 className="font-semibold mb-2">Personalized Recommendations</h3>
                            <p>Whether you&apos;re looking for books similar to ones you&apos;ve already enjoyed, books on specific topics, or books tailored to certain preferences, PageTurn AI can understand your query and provide relevant recommendations.</p>
                        </div>

                        <div className="pl-4 border-l-4 border-blue-500">
                            <h3 className="font-semibold mb-2">Diverse Suggestions</h3>
                            <p>Looking for &quot;fantasy books with strong female protagonists&quot; or &quot;non-fiction about climate change that&apos;s accessible to beginners&quot;? PageTurn AI comprehends these nuanced requests and finds books that match your specific interests.</p>
                        </div>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gradient">How to Use PageTurn AI</h2>

                        <ol className="list-decimal pl-5 space-y-3">
                            <li><strong>Enter Your Query</strong>: Type what you&apos;re looking for in the search box on our homepage. Be as specific or general as you like.</li>
                            <li><strong>Review Recommendations</strong>: We&apos;ll show you books that match your query, complete with covers, descriptions, and other details.</li>
                            <li><strong>Refine Your Search</strong>: Not quite what you&apos;re looking for? Try a more specific query or add additional details about your preferences.</li>
                        </ol>

                        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gradient">Example Queries</h2>

                        <ul className="list-disc pl-5 space-y-2">
                            <li>&quot;Fantasy books for a 9-year-old who loves Harry Potter&quot;</li>
                            <li>&quot;Books similar to The Alchemist with philosophical themes&quot;</li>
                            <li>&quot;Science fiction with complex female characters&quot;</li>
                            <li>&quot;Historical fiction set in ancient Rome&quot;</li>
                            <li>&quot;Self-improvement books about productivity and habits&quot;</li>
                        </ul>

                        <p className="mt-8 italic">
                            PageTurn AI is constantly learning and improving. The more specific your query, the better we can tailor our recommendations to your preferences.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
