"use client";

export default function About() {
    return (
        <article className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 animate-fadeIn">
                <h1 className="text-3xl font-bold mb-6 text-gradient">About PageTurn AI</h1>

                <div className="space-y-8">
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        PageTurn AI is an intelligent book recommendation system designed to help you discover your next favorite read.
                    </p>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gradient">How It Works</h2>

                        <div className="space-y-4">
                            <div className="pl-4 border-l-4 border-blue-500 py-2">
                                <h3 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Natural Language Understanding</h3>
                                <p className="text-gray-700 dark:text-gray-300">Unlike traditional recommendation systems that rely on tags or categories, PageTurn AI understands natural language queries. This means you can describe what you&apos;re looking for in your own words, just as you would to a librarian or bookstore employee.</p>
                            </div>

                            <div className="pl-4 border-l-4 border-blue-500 py-2">
                                <h3 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Personalized Recommendations</h3>
                                <p className="text-gray-700 dark:text-gray-300">Whether you&apos;re looking for books similar to ones you&apos;ve already enjoyed, books on specific topics, or books tailored to certain preferences, PageTurn AI can understand your query and provide relevant recommendations.</p>
                            </div>

                            <div className="pl-4 border-l-4 border-blue-500 py-2">
                                <h3 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Diverse Suggestions</h3>
                                <p className="text-gray-700 dark:text-gray-300">Looking for &quot;fantasy books with strong female protagonists&quot; or &quot;non-fiction about climate change that&apos;s accessible to beginners&quot;? PageTurn AI comprehends these nuanced requests and finds books that match your specific interests.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gradient">How to Use PageTurn AI</h2>

                        <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                            <li><span className="font-medium text-gray-900 dark:text-white">Enter Your Query</span>: Type what you&apos;re looking for in the search box on our homepage. Be as specific or general as you like.</li>
                            <li><span className="font-medium text-gray-900 dark:text-white">Review Recommendations</span>: We&apos;ll show you books that match your query, complete with covers, descriptions, and other details.</li>
                            <li><span className="font-medium text-gray-900 dark:text-white">Refine Your Search</span>: Not quite what you&apos;re looking for? Try a more specific query or add additional details about your preferences.</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gradient">Example Queries</h2>

                        <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                                <li>Fantasy books for a 9-year-old who loves Harry Potter</li>
                                <li>Books similar to The Alchemist with philosophical themes</li>
                                <li>Science fiction with complex female characters</li>
                                <li>Historical fiction set in ancient Rome</li>
                                <li>Self-improvement books about productivity and habits</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </article>
    );
}
