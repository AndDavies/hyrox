"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section id="faq" className="max-w-6xl mx-auto px-4 py-8 bg-gray-100">
      <h2 className="text-4xl font-extrabold text-black text-center mb-8">
        Updated FAQ for Hyrox Training Hub
      </h2>
      <Accordion type="single" collapsible>
        {/* FAQ 1 */}
        <AccordionItem value="hyrox-training-hub">
          <AccordionTrigger className="text-lg font-bold text-black">
            What is the Hyrox Training Hub?
          </AccordionTrigger>
          <AccordionContent className="text-base font-medium text-black">
            Hyrox Training Hub is your go-to online directory for all things Hyrox. We provide in-depth Hyrox training
            plan reviews, connect you with coaches and gyms, list upcoming Hyrox events, and share expert resources. Our
            mission is to help athletes grow the sport of fitness by providing easy access to trusted Hyrox programs and
            training centers worldwide.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 2 */}
        <AccordionItem value="find-right-plan">
          <AccordionTrigger className="text-lg font-bold text-black">
            How do I find the right Hyrox training plan through the Hub?
          </AccordionTrigger>
          <AccordionContent className="text-base font-medium text-black">
            You can browse our curated listings of Hyrox workout programs by filtering for fitness level, time
            commitment, and desired results. Each plan includes details such as coaches, session frequency, and athlete
            reviews. Compare multiple Hyrox training plans side by side to find the one that fits your goals and
            schedule.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 3 */}
        <AccordionItem value="what-is-hyrox">
          <AccordionTrigger className="text-lg font-bold text-black">
            What exactly is Hyrox, and why is it popular?
          </AccordionTrigger>
          <AccordionContent className="text-base font-medium text-black">
            Hyrox is a global fitness race that merges running and functional workouts into a single event. Participants
            complete eight 1 km runs, each followed by a functional exercise station like the SkiErg, sled push, or wall
            balls. It’s popular because of its standardized format, which enables worldwide competition and
            straightforward tracking of personal bests. At the Hyrox Training Hub, we help you prepare for Hyrox races
            by featuring top training plans, coaches, and gyms.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 4 */}
        <AccordionItem value="trust-coaches">
          <AccordionTrigger className="text-lg font-bold text-black">
            Why should I trust Hyrox Training Hub’s coaches and reviews?
          </AccordionTrigger>
          <AccordionContent className="text-base font-medium text-black">
            The Hyrox Training Hub team carefully reviews and vets each Hyrox coach, gym, and training program before
            listing them. Our goal is to grow the sport by connecting athletes to quality resources. We also include
            authentic user feedback and verified athlete testimonials whenever possible, so you can feel confident
            choosing a Hyrox workout plan that truly works.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 5 */}
        <AccordionItem value="hyrox-vs-crossfit">
          <AccordionTrigger className="text-lg font-bold text-black">
            How does Hyrox differ from CrossFit or similar fitness competitions?
          </AccordionTrigger>
          <AccordionContent className="text-base font-medium text-black">
            <strong>Race Structure:</strong> Hyrox uses a fixed format of eight 1 km runs and eight functional workout
            stations, so you know exactly what to train for. CrossFit, by comparison, features constantly varied
            workouts with unknown elements in competitions. <br />
            <strong>Focus:</strong> Hyrox emphasizes running endurance plus a core set of functional exercises, while
            CrossFit covers a broader range of lifts and gymnastic movements. <br />
            <strong>Competition Duration:</strong> Most Hyrox races last 60–90 minutes; CrossFit events are typically
            shorter, with varied WODs (Workouts of the Day). <br />
            <strong>Community:</strong> Hyrox is building a worldwide network of coaches, gyms, and races that are
            standardized for global rankings. CrossFit is well known for a large, tightly knit community and
            unpredictable competitions.
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 6 */}
        <AccordionItem value="race-exercises">
          <AccordionTrigger className="text-lg font-bold text-black">
            Which exercises will I face in a Hyrox race?
          </AccordionTrigger>
          <AccordionContent className="text-base font-medium text-black">
            Each Hyrox race includes eight workout stations paired with eight 1 km runs:
            <ul className="list-disc pl-6 mt-2">
              <li>SkiErg (1,000 m)</li>
              <li>Sled Push (50 m)</li>
              <li>Sled Pull (50 m)</li>
              <li>Burpee Broad Jumps (80 m)</li>
              <li>Rowing (1,000 m)</li>
              <li>Farmer’s Carry (200 m)</li>
              <li>Sandbag Lunges (100 m)</li>
              <li>Wall Balls (up to 100 reps)</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* FAQ 7 */}
        <AccordionItem value="improve-time">
          <AccordionTrigger className="text-lg font-bold text-black">
            How can I improve my Hyrox race time?
          </AccordionTrigger>
          <AccordionContent className="text-base font-medium text-black">
            Boost your Hyrox performance by focusing on:
            <ul className="list-disc pl-6 mt-2">
              <li>Running Efficiency: Speed, tempo, and compromised run intervals.</li>
              <li>
                Functional Strength: Mastering sled pushes, SkiErg, burpee broad jumps, and other race stations.
              </li>
              <li>Hybrid/HIIT Circuits: Merge running with quick functional sets to mirror race fatigue.</li>
              <li>Pacing Strategy: Dial in your heart rate zones and recovery intervals.</li>
              <li>Balanced Recovery: Adequate rest, fueling, and mobility work.</li>
            </ul>
            Find a structured plan on Hyrox Training Hub that suits your skill level and schedule—consistency is key.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
