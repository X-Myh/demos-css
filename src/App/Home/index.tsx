/**
 * author iWuzhi
 * date 2021-12-18 14:00:31
 */
import { useState, useEffect } from 'react'

import Timeline from '../Resume'

import bg from './bg.png'

const cliSays = [
  ['whoami', ['X·M']],
  ['gender', ['Male']],
  ['birth', ['199X-05-2X XX:XX:XX']],
  ['profession', ['#ComputerEngineer #Web #React #JavaScript #HTML #CSS #LESS']],
  ['hobby', ['#Coding #Games #Music']],
  ['...', ['...']],
]

interface IProps {}

const PAUSE_TIME = 250

const Home: React.FC<IProps> = () => {
  const [says, setSays] = useState([])

  const sayTimer = (finish) => {
    const timer = globalThis.setTimeout(() => {
      setSays((pre) => {
        if (pre.length === cliSays.length) return pre
        const nextSays = pre.concat([])
        nextSays.push(cliSays[pre.length])
        return nextSays
      })
      finish()
    }, PAUSE_TIME)
    return timer
  }

  useEffect(() => {
    let timer
    let sayingIndex = 0
    const finish = () => {
      if (sayingIndex < cliSays.length - 1) {
        sayingIndex++
        timer = sayTimer(finish)
      }
    }
    timer = sayTimer(finish)

    return () => {
      sayingIndex = 0
      globalThis.clearTimeout(timer)
    }
  }, [])

  return (
    <div className="bg-black rounded-none">
      <div className="relative flex items-center justify-center text-white h-screen">
        <div
          className="absolute top-0 left-0 z-0 w-full h-full bg-[center_left_-10rem] lg:bg-center  bg-no-repeat bg-cover"
          style={{ backgroundImage: `url('${bg}')` }}
        />
        <div className="inline-block w-4/5 p-6 border rounded-md shadow-lg h-3/5 text-blue backdrop-blur-md shadow-blue-500/50 border-blue-500/50">
          <h1 className="mb-4 text-4xl text-center lg:text-6xl text-gr">Welcome2 !</h1>
          <ul>
            {says.map(([cmd, output]) => {
              return (
                <li key={cmd}>
                  <div>
                    <i className="mr-4 text-green-300">→</i>
                    <i className="typing" data-len={cmd.length}>
                      {cmd}
                    </i>
                  </div>
                  <div>{output}</div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <Timeline />
    </div>
  )
}

export default Home
