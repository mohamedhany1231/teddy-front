import { Container, Grid2, Typography } from "@mui/material";
import TopProducts from "../ui/TopProducts";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function Home() {
  const mainControls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 1 });

  const aboutControls = useAnimation();
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  useEffect(() => {
    if (aboutInView) {
      aboutControls.start("visible");
    }
  }, [aboutInView, aboutControls]);
  return (
    <>
      <Container>
        <section className=" pb-[10%]">
          <motion.img
            className="   ~sm/lg:~h-40/96 ~sm/lg:~w-40/96 object-cover rounded-full  float-left mr-4  "
            src="/images/landing.jpg"
            alt="teddy bear image"
            style={{ shapeOutside: "circle(50%)" }}
            initial={{ x: -100, scale: 0.5 }}
            animate={{ x: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              type: "spring",
              delay: 0.4,
            }}
          />
          <div className="  ~sm/lg:~pl-4/12">
            <motion.h2
              className="text-gray-50 ~sm/lg:!~text-xl/4xl font-bold  "
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                type: "spring",
                delay: 0.6,
              }}
            >
              {" "}
              Hey there, human! 👋🐻
            </motion.h2>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                type: "tween",
                delay: 0.8,
              }}
              className=" ~sm/lg:!~text-sm/xl"
            >
              Are you looking for a new best friend who's always ready for a
              cuddle or a game of chase? Look no further! I'm a friendly teddy
              bear, and I'm here to welcome you to Teddyville, the happiest
              place on Earth for humans and bears alike.
              <br />
              Our marketplace is filled with the softest, most cuddly teddy
              bears you'll ever find. We've got bears of all shapes, sizes, and
              colors, so there's sure to be one that's perfect for you. Whether
              you need a snuggle buddy, a playmate, or a comforting companion,
              we've got you covered.
              <br />
              So come on in and explore our collection. I can't wait to meet you
              and become your new best friend! 🧸❤️
            </motion.p>
          </div>
        </section>
      </Container>
      <section className=" my-16 bg-blend-multiply bg-[url('/images/landing2.jpg')] bg-black  bg-opacity-65 bg-cover h-[70vh] w-full  bg-center flex items-center justify-center  ">
        <motion.h3
          ref={ref}
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          initial={"hidden"}
          animate={mainControls}
          className=" text-white text-center ~sm/lg:!~text-xl/4xl  px-4 font-bold "
        >
          Take a nap, but don't hibernate. <br /> There's a whole world out
          there waiting to be explored.
        </motion.h3>
      </section>

      <Container>
        <motion.section
          ref={aboutRef}
          transition={{ delay: 0, duration: 0.8 }}
          variants={{
            hidden: { opacity: 0, y: 75 },
            visible: { opacity: 1, y: 0 },
          }}
          initial={"hidden"}
          animate={aboutControls}
        >
          <Grid2 container spacing={6} className="pb-12 pt-8">
            <Grid2 size={{ xs: 12, lg: 8 }} className="">
              <h3 className=" !mb-4 text-gray-50 ~sm/lg:!~text-xl/4xl font-bold ">
                A Word from Your Teddyville Ambassador
              </h3>
              <Typography
                variant="body1"
                className="~sm/lg:!~text-sm/xl font-bold"
              >
                Greetings, esteemed human! Allow me to introduce Teddyville,
                your premier destination for plush companions of the highest
                caliber. We are dedicated to crafting teddy bears that are not
                merely toys, but cherished companions, woven with threads of
                love and comfort.
                <br />
                Our collection features a diverse array of styles and
                personalities, each meticulously designed to evoke a sense of
                warmth and nostalgia. Rest assured, every teddy bear we offer is
                crafted with the utmost care and attention to detail, ensuring a
                truly exceptional experience.
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 4 }}>
              <img
                src="/images/about.jpeg"
                alt="bears in suits"
                className=" h-full max-h-[500px] m-auto   object-cover shadow-sm shadow-orange-800 rounded-md"
              />
            </Grid2>
          </Grid2>
        </motion.section>

        {/* <TopProducts /> */}
      </Container>
    </>
  );
}

export default Home;
