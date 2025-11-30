import React from 'react'

export default function Footer() {
    return (
        <footer className="border-t bg-gradient-to-r from-black to-gray-500 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div>
                        <h4 className="font-semibold mb-2">About</h4>
                        <p className="max-w-sm">TeerexStore — a demo shopping site to practice building full-stack features step by step.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Support</h4>
                        <ul className="space-y-1">
                            <li>Help Center</li>
                            <li>Contact Us</li>
                            <li>Shipping</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Legal</h4>
                        <ul className="space-y-1">
                            <li>Privacy</li>
                            <li>Terms</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 text-xs text-gray-400">© {new Date().getFullYear()} TeerexStore — Demo project</div>
            </div>
        </footer>
    )
}
