import { Box, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Header from "./component/header.jsx";
import HeroSection from "./component/heroSection.jsx";
import Benefit from "./component/benefitsOfLearning.jsx";
import CourseRoadmap from "./component/courseRoadmap.jsx";
import Certificate from "./component/certificate.jsx";
import Faq from "./component/faq.jsx";
import Form from "./component/registrationForm.jsx";
import Testimonials from "./component/testimonials.jsx";
import Feedback from "./component/feedback.jsx";
import Footer from "./component/footer.jsx";
import CoreOfValue from "./component/coreOfValue.jsx";
import Educator from "./component/educator.jsx";
import bg from "./assets/tri-tue-nhan-tao-ai.jpg";
import CourseAi from "../src/component/courseAi.jsx";
import LearnAi from "./component/whoLearnAi.jsx";
import ChatbotInterface from "./component/popup/chatbotPopup.jsx";
import Chatbot from "./component/chatbot/chatbot.jsx";
import useChatbot from "./services/useChatbot.js";

// Scroll animation wrapper
const ScrollAnimationBox = ({ children, id, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [delay]);

  return (
    <Box
      ref={elementRef}
      id={id}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(50px)",
        transition: "all 0.8s ease-out",
        willChange: "opacity, transform",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
};

export const App = () => {
  const { isConnected } = useChatbot();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        bgcolor: "transparent",
      }}
    >
      {/* Background Image Fixed Full Screen */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          // backgroundImage: `url(${bg})`,
          backgroundColor: "rgb(217 217 217)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1,
        }}
      />

      {/* Content Layer */}
      <Box>
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
          }}
        >
          <Stack spacing={0}>
            <Header />

            <ScrollAnimationBox id="intro">
              <HeroSection />
            </ScrollAnimationBox>

            <ScrollAnimationBox id="coreOfValue" delay={100}>
              <CoreOfValue />
            </ScrollAnimationBox>

            <ScrollAnimationBox id="">
              <LearnAi />
            </ScrollAnimationBox>

            <ScrollAnimationBox id="content" delay={200}>
              <Benefit />
            </ScrollAnimationBox>

            <ScrollAnimationBox delay={300}>
              <CourseRoadmap />
            </ScrollAnimationBox>

            <ScrollAnimationBox id="educator" delay={100}>
              <Educator />
            </ScrollAnimationBox>

            <ScrollAnimationBox id="certificate" delay={200}>
              <Certificate />
            </ScrollAnimationBox>

            <ScrollAnimationBox id="" delay={300}>
              <CourseAi />
            </ScrollAnimationBox>

            <ScrollAnimationBox id="instructor" delay={300}>
              <Testimonials />
            </ScrollAnimationBox>

            <ScrollAnimationBox delay={100}>
              <Feedback />
            </ScrollAnimationBox>

            <ScrollAnimationBox id="register" delay={200}>
              <Form />
            </ScrollAnimationBox>

            <ScrollAnimationBox id="faq" delay={300}>
              <Faq />
            </ScrollAnimationBox>

            <Footer />
          </Stack>
        </Box>
        <Box>
          {/* <ChatbotInterface /> */}
          {isConnected && <Chatbot />}
        </Box>
      </Box>
    </Box>
  );
};
