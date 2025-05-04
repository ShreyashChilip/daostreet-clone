import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-[#0a192f] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image src="/placeholder.svg?height=40&width=40" alt="DAOStreet Logo" width={40} height={40} />
              <span className="ml-2 text-xl font-bold">DAOStreet</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400 max-w-xs">Creating and managing DAOs made simple.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-gray-400 hover:text-white text-sm">
                    Help
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white text-sm">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-4">Community</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/community" className="text-gray-400 hover:text-white text-sm">
                    Join Community
                  </Link>
                </li>
                <li>
                  <Link href="/diary" className="text-gray-400 hover:text-white text-sm">
                    Street Diary
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© 2023 DAOStreet LLC. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white mx-2">
              Twitter
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white mx-2">
              Discord
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white mx-2">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
