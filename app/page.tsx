"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  Heart,
  Sparkles,
  Gift,
  Calendar,
  Camera,
  Star,
  Music,
  Quote,
  Crown,
  Infinity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// ─────────────────────────────────────────────────────────
// ➊  Define ALL static arrays FIRST so they’re initialized
// ─────────────────────────────────────────────────────────
const photos = [
  "https://i.postimg.cc/dt95xq4m/Snapchat-1240528840.jpg",
  "https://i.postimg.cc/CL0v7ZHx/Snapchat-1612225107.jpg",
  "https://i.postimg.cc/zGXxm9Qm/Snapchat-502677327.jpg",
  "https://i.postimg.cc/W1WXs5Rd/Snapchat-585765459.jpg",
  "https://i.postimg.cc/Zn8wZZZm/Snapchat-610727199.jpg",
  "https://i.postimg.cc/xdZx3tgw/Snapchat-719567201.jpg",
  "https://i.postimg.cc/zvZx9vsp/Snapchat-827815563.jpg",
  "https://i.postimg.cc/PfY31bD7/Snapchat-879652095.jpg",
  "https://i.postimg.cc/1tF7P7VV/Snapchat-1422194807.jpg"
]

const loveQuotes = [
  "You are my today and all of my tomorrows ✨",
  "In your smile, I see something more beautiful than stars 🌟",
  "You make my heart skip beats and my soul dance 💃",
]

const reasonsILoveYou = [
  { icon: Star, text: "Your beautiful smile that lights up my world", color: "text-yellow-500" },
  { icon: Heart, text: "The way you care for everyone around you", color: "text-red-500" },
  { icon: Sparkles, text: "Your infectious laughter that makes me happy", color: "text-purple-500" },
  { icon: Crown, text: "Your strength and determination in everything", color: "text-pink-500" },
  { icon: Music, text: "How you sing along to our favorite songs", color: "text-blue-500" },
  { icon: Infinity, text: "Your endless kindness and beautiful heart", color: "text-green-500" },
]

// const specialMemories = [
//   { date: "First Date", description: "The day that changed everything forever", emoji: "💕" },
//   { date: "First Kiss", description: "Under the stars, perfect and magical", emoji: "💋" },
//   { date: "First 'I Love You'", description: "Words that made my heart complete", emoji: "❤️" },
//   { date: "Our Adventures", description: "Every journey is better with you", emoji: "🌍" },
//   { date: "Quiet Moments", description: "Just us, talking about everything", emoji: "🌙" },
//   { date: "Future Dreams", description: "All the plans we make together", emoji: "✨" },
// ]

// const futureDreams = [
//   { icon: MapPin, title: "Travel the World", desc: "Exploring new places hand in hand" },
//   { icon: Heart, title: "Build Our Home", desc: "Creating a space filled with love" },
//   { icon: Star, title: "Chase Our Dreams", desc: "Supporting each other's goals" },
//   { icon: Infinity, title: "Grow Old Together", desc: "Forever and always, my love" },
// ]

// ─────────────────────────────────────────────────────────
// ➋  Component starts here
// ─────────────────────────────────────────────────────────
export default function BirthdayWebsite() {
  const [mounted, setMounted] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [heartClicks, setHeartClicks] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  // const [currentMemory, setCurrentMemory] = useState(0)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setMounted(true)

    // Auto-rotate love quotes
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % loveQuotes.length)
    }, 4000)

    // // Auto-rotate memories
    // const memoryInterval = setInterval(() => {
    //   setCurrentMemory((prev) => (prev + 1) % specialMemories.length)
    // }, 6000)

    return () => {
      clearInterval(quoteInterval)
    //  clearInterval(memoryInterval)
    }
  }, [])

  if (!mounted) return null

  const handleHeartClick = () => {
    setHeartClicks((prev) => prev + 1)
    if (heartClicks > 0 && heartClicks % 10 === 0) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50 relative overflow-hidden">
      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -10,
                  rotate: 0,
                }}
                animate={{
                  y: window.innerHeight + 10,
                  rotate: 360,
                  x: Math.random() * window.innerWidth,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Floating Hearts Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: (typeof window !== "undefined" ? window.innerHeight : 1000) + 100,
              rotate: 0,
              scale: 0,
            }}
            animate={{
              y: -100,
              rotate: 360,
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            <Heart className="w-4 h-4" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Sparkle Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
              scale: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          >
            <Sparkles className="w-3 h-3" />
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <motion.section className="relative min-h-screen flex items-center justify-center px-4" style={{ y, opacity }}>
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "backOut" }}
            className="mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Crown className="w-16 h-16 mx-auto text-pink-500 mb-4" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent mb-6"
          >
            Happy 24th Birthday Moti!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-2xl md:text-3xl text-gray-700 mb-8 font-light"
          >
            To my Rasmalai, my everything ✨
          </motion.p>

          {/* Interactive Heart Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mb-8"
          >
            <motion.button
              onClick={handleHeartClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-red-400 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Heart className="w-6 h-6 inline mr-2" fill="currentColor" />
              Click for Love! ({heartClicks})
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex items-center justify-center gap-4 text-lg text-gray-600 mb-12"
          >
            <Calendar className="w-6 h-6 text-pink-500" />
            <span className="font-medium">July 10th, 2024</span>
            <Gift className="w-6 h-6 text-purple-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => document.getElementById("love-quotes")?.scrollIntoView({ behavior: "smooth" })}
            >
              Discover My Love for You
              <Heart className="w-5 h-5 ml-2" fill="currentColor" />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Love Quotes Carousel */}
      <motion.section
        id="love-quotes"
        className="py-20 px-4 bg-gradient-to-r from-pink-100 to-purple-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="w-12 h-12 mx-auto mb-8 text-purple-500" />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-light text-gray-700 italic"
            >
              {`"${loveQuotes[currentQuote]}"`}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Age Celebration Section */}
      <motion.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.5 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.div
              animate={{
                textShadow: [
                  "0 0 20px rgba(236, 72, 153, 0.5)",
                  "0 0 40px rgba(147, 51, 234, 0.5)",
                  "0 0 20px rgba(236, 72, 153, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-rose-400 bg-clip-text text-transparent"
            >
              2
            </motion.div>
            <p className="text-2xl text-gray-600 mt-4">Years of Pure Magic!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Years of Love",
                desc: "Every moment with you is precious",
                color: "from-red-400 to-pink-500",
              },
              {
                icon: Sparkles,
                title: "Dreams Coming True",
                desc: "Another year of adventures ahead",
                color: "from-purple-400 to-indigo-500",
              },
              {
                icon: Crown,
                title: "My Rasmalai",
                desc: "You rule my heart completely",
                color: "from-yellow-400 to-orange-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center`}
                >
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Reasons I Love You Section */}
      <motion.section
        className="py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Infinity className="w-12 h-12 mx-auto mb-4 text-pink-500" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Infinite Reasons I Love You
            </h2>
            <p className="text-xl text-gray-600">Here are just a few of the countless reasons</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasonsILoveYou.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <reason.icon className={`w-8 h-8 mb-4 ${reason.color}`} />
                <p className="text-gray-700 font-medium">{reason.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Special Memories Timeline */}
      {/* <motion.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Clock className="w-12 h-12 mx-auto mb-4 text-purple-500" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Our Love Story Timeline
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-300 to-purple-300 rounded-full"></div>

            {specialMemories.map((memory, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                    <div className="text-3xl mb-2">{memory.emoji}</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{memory.date}</h3>
                    <p className="text-gray-600">{memory.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full border-4 border-white shadow-lg"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section> */}

      {/* Photo Gallery Section */}
      <motion.section
        id="memories"
        className="py-20 px-4 bg-white/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Camera className="w-12 h-12 mx-auto mb-4 text-purple-500" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Our Beautiful Journey
            </h2>
            <p className="text-xl text-gray-600">Every picture tells our love story</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  rotate: Math.random() * 10 - 5,
                  zIndex: 10,
                }}
                className="relative group cursor-pointer"
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={photo || "/placeholder.svg"}
                        alt={`Memory ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        width={500}
                        height={500}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <p className="text-white p-4 font-medium">Beautiful Memory #{index + 1}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Future Dreams Section */}
      {/* <motion.section
        className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Star className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Our Future Together
            </h2>
            <p className="text-xl text-gray-600">All the dreams we'll make come true</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {futureDreams.map((dream, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="text-center"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg"
                >
                  <dream.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{dream.title}</h3>
                <p className="text-gray-600">{dream.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section> */}

      {/* Love Message Section */}
      <motion.section
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 to-purple-100/50"></div>
            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Heart className="w-16 h-16 mx-auto mb-8 text-red-500" fill="currentColor" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">A Love Letter for My Birthday Girl</h2>
              <div className="text-lg md:text-xl text-gray-700 leading-relaxed space-y-6">
                <p>
                  My dearest love, on this magical day when you turn 24, I want you to know that you are the most
                  incredible person I&apos;ve ever known. Your smile is my sunrise, your laughter is my favorite song, and
                  your love is my greatest treasure.
                </p>
                <p>
                  Every day with you feels like a celebration. You bring color to my world, joy to my heart, and meaning
                  to my life. As you step into this new year, I&apos;m excited for all the adventures, dreams, and beautiful
                  moments we&apos;ll create together.
                </p>
                <p>
                  You deserve all the happiness, love, and magic that life has to offer. I promise to be by your side
                  through every laugh, every dream, and every moment of this incredible journey we&apos;re on together.
                </p>
                <motion.p
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="text-2xl font-semibold bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_100%]"
                >
                  {`Happy 24th Birthday, my beautiful queen! Here's to another year of loving you endlessly! 💕✨`}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="py-12 px-4 text-center bg-gradient-to-r from-pink-100 to-purple-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="text-6xl mb-4"
          >
            🎂✨🎉
          </motion.div>
          <p className="text-xl text-gray-600 mb-4">Made with infinite love for the most amazing person ✨</p>
          <p className="text-gray-500 mb-4">July 10th, 2024 • Your Special Day</p>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-pink-500"
          >
            💕 Forever and Always 💕
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}
