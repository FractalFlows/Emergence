import Fiber from 'fibers'

export default function sleep(ms){
  const fiber = Fiber.current
  setTimeout(function(){
    fiber.run()
  }, ms)
  Fiber.yield()
}
