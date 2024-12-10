'use client' ;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Calendar, DollarSign, Star, ArrowRight } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-orange-50">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-100">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none text-orange-800">
                    Discover and Book Amazing Events
                  </h1>
                  <p className="max-w-[600px] text-orange-700 md:text-xl mx-auto lg:mx-0">
                    Explore a wide variety of events and make your next outing an unforgettable experience!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                  <Button className="bg-orange-600 text-white hover:bg-orange-500">Create an Event</Button>
                  <Button variant="outline" className="text-orange-800 border-orange-800 hover:bg-orange-200">Book an Event</Button>
                </div>
              </div>
              <img
                src="https://picsum.photos/seed/picsum/200/300"
                alt="Event"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-orange-800">Top Features</h2>
                <p className="max-w-[900px] text-orange-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers these incredible features to enhance your event experience.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Calendar className="h-12 w-12 text-orange-800" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold text-orange-800">Easy Scheduling</h3>
                  <p className="text-orange-700">
                    Schedule your events with ease and flexibility.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4">
                <Star className="h-12 w-12 text-orange-800" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold text-orange-800">Top-rated Events</h3>
                  <p className="text-orange-700">
                    Explore events that are loved and highly rated by attendees.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4">
                <DollarSign className="h-12 w-12 text-orange-800" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold text-orange-800">Flexible Pricing</h3>
                  <p className="text-orange-700">
                    Get the best prices for events that fit your budget.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-orange-800">What Our Users Say</h2>
              </div>

              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none text-orange-800">John Doe</p>
                      <p className="text-xs text-orange-700">Event Enthusiast</p>
                    </div>
                  </div>
                  <p className="text-orange-700">
                    "An exceptional platform that has transformed my event planning experience!"
                  </p>
                </Card>

                <Card className="flex flex-col items-start space-y-4 p-6 bg-white">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none text-orange-800">Sarah Miller</p>
                      <p className="text-xs text-orange-700">Professional Event Planner</p>
                    </div>
                  </div>
                  <p className="text-orange-700">
                    "I love the user-friendly interface and comprehensive features!"
                  </p>
                </Card>

                <Card className="flex flex-col items-start space-y-4 p-6 bg-white">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none text-orange-800">Michael Johnson</p>
                      <p className="text-xs text-orange-700">Casual Attendee</p>
                    </div>
                  </div>
                  <p className="text-orange-700">
                    "Booking events has never been easier, and the selection is fantastic!"
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-orange-800">Pricing Plans</h2>
                <p className="max-w-[900px] text-orange-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose a plan that's right for your event needs.
                </p>
              </div>

              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-orange-800">Basic</h3>
                    <p className="text-4xl font-bold text-orange-800">
                      $10<span className="text-2xl font-medium text-orange-700">/mo</span>
                    </p>
                  </div>
                  <ul className="grid gap-2 text-orange-700">
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4 text-orange-800" />
                      Access to Basic Events
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4 text-orange-800" />
                      Standard Support
                    </li>
                  </ul>
                  <Button className="w-full bg-orange-600 text-white hover:bg-orange-500">Get Started</Button>
                </Card>

                <Card className="flex flex-col items-start space-y-4 p-6 bg-orange-600 text-white">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Pro</h3>
                    <p className="text-4xl font-bold">
                      $30<span className="text-2xl font-medium">/mo</span>
                    </p>
                  </div>
                  <ul className="grid gap-2">
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Access to All Events
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4" />
                      Priority Support
                    </li>
                  </ul>
                  <Button className="w-full bg-white text-orange-600 hover:bg-orange-100">Get Started</Button>
                </Card>

                <Card className="flex flex-col items-start space-y-4 p-6 bg-white">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-orange-800">Premium</h3>
                    <p className="text-4xl font-bold text-orange-800">
                      $50<span className="text-2xl font-medium text-orange-700">/mo</span>
                    </p>
                  </div>
                  <ul className="grid gap-2 text-orange-700">
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4 text-orange-800" />
                      Unlimited Events Access
                    </li>
                    <li>
                      <Check className="mr-2 inline-block h-4 w-4 text-orange-800" />
                      Dedicated Support
                    </li>
                  </ul>
                  <Button className="w-full bg-orange-600 text-white hover:bg-orange-500">Get Started</Button>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-orange-200 p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold text-orange-800">Product</h3>
            <a href="#" className="text-orange-700">Features</a>
            <a href="#" className="text-orange-700">Integrations</a>
            <a href="#" className="text-orange-700">Pricing</a>
            <a href="#" className="text-orange-700">Security</a>
          </div>

          <div className="grid gap-1">
            <h3 className="font-semibold text-orange-800">Company</h3>
            <a href="#" className="text-orange-700">About Us</a>
            <a href="#" className="text-orange-700">Careers</a>
            <a href="#" className="text-orange-700">Blog</a>
            <a href="#" className="text-orange-700">Contact</a>
          </div>

          <div className="grid gap-1">
            <h3 className="font-semibold text-orange-800">Resources</h3>
            <a href="#" className="text-orange-700">Documentation</a>
            <a href="#" className="text-orange-700">Help Center</a>
            <a href="#" className="text-orange-700">Community</a>
            <a href="#" className="text-orange-700">Templates</a>
          </div>

          <div className="grid gap-1">
            <h3 className="font-semibold text-orange-800">Legal</h3>
            <a href="#" className="text-orange-700">Privacy Policy</a>
            <a href="#" className="text-orange-700">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;