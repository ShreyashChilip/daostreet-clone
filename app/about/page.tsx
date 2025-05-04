export default function AboutPage() {
  return (
    <main className="flex-1 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About DAOStreet</h1>

        <div className="prose">
          <p>
            DAOStreet is a platform designed to help you create, manage, and participate in Decentralized Autonomous
            Organizations (DAOs). Our mission is to make DAOs accessible to everyone, providing the tools and resources
            needed to build thriving communities.
          </p>

          <h2>Our Vision</h2>
          <p>
            We believe in the power of decentralized governance and community-driven decision making. DAOStreet aims to
            be the go-to platform for anyone looking to start or join a DAO, offering a user-friendly interface and
            comprehensive tools for DAO management.
          </p>

          <h2>What We Offer</h2>
          <ul>
            <li>Easy DAO creation and management</li>
            <li>Community building tools</li>
            <li>Transparent governance mechanisms</li>
            <li>Educational resources about DAOs</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            Have questions or suggestions? We'd love to hear from you! Reach out to us at{" "}
            <a href="mailto:info@daostreet.io">info@daostreet.io</a>.
          </p>
        </div>
      </div>
    </main>
  )
}
