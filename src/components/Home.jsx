import Header from "./Header";
import { Card, Container } from "react-bootstrap";

function Home() {
  return (
    <>
      <Header />
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom right, #000000, #1c1c1e)",
          paddingTop: "4rem",
          color: "#fff",
        }}
      >
        <Container>
          <Card
            className="mx-auto shadow-lg"
            style={{
              maxWidth: "800px",
              background:
                "linear-gradient(to right, rgba(28,28,30,0.9), rgba(50,50,55,0.85))",
              backdropFilter: "blur(12px)",
              borderRadius: "1rem",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "2.5rem",
            }}
          >
            <Card.Body>
              <h1
                className="text-center mb-4"
                style={{
                  fontWeight: "700",
                  fontSize: "2.2rem",
                  color: "#ffffff",
                  textShadow: "0 1px 4px rgba(255,255,255,0.1)",
                }}
              >
                Welcome to{" "}
                <span style={{ color: "#f8f9fa" }}>Images Gallery</span>
              </h1>

              <p
                style={{
                  fontSize: "1.15rem",
                  lineHeight: "1.8",
                  color: "#ddd",
                }}
              >
                Discover a world of visual inspiration. Just type a word like{" "}
                <strong>“cat”</strong> and click <em>Search</em> — you'll
                instantly see a curated gallery of stunning images.
              </p>

              <p
                style={{
                  fontSize: "1.15rem",
                  lineHeight: "1.8",
                  color: "#ddd",
                }}
              >
                Found something beautiful? Simply save it to your personal
                collection with a single click. Want to organize later? You can
                delete any saved images anytime.
              </p>

              <p
                style={{
                  fontSize: "1.15rem",
                  lineHeight: "1.8",
                  color: "#ddd",
                }}
              >
                Your saved images are securely stored in your account — always
                accessible and easy to manage.
              </p>

              <p
                style={{
                  fontSize: "1.15rem",
                  lineHeight: "1.8",
                  color: "#ffffff",
                  fontWeight: 500,
                }}
              >
                👉 To start exploring images, head over to the{" "}
                <a
                  href="/gallery"
                  className="btn btn-outline-light btn-sm"
                  style={{
                    padding: "0.4rem 1rem",
                    borderRadius: "50px",
                    fontWeight: "500",
                    fontSize: "1.2rem",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  My gallery
                </a>{" "}
                page.
              </p>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default Home;

// import Header from "./Header";
// function Home() {
//   return (
//     <>
//       <Header />
//       <h1>home</h1>
//     </>
//   );
// }

// export default Home;
