export const makeGridPatterns = (colors: Array<string>) => {
  return [
    // 01
    {
      oddColors: [
        colors[0],
        colors[0],
        colors[0],
        colors[1],
      ],
      evenColors: [
        colors[0],
        colors[1],
        colors[0],
        colors[0],
      ]
    },
    // 02
    {
      oddColors: [
        colors[0],
        colors[1],
        colors[0],
        colors[1],
      ],
      evenColors: [
        colors[1],
        colors[0],
        colors[1],
        colors[0],
      ],
    },
    // 03
    {
      oddColors: [
        colors[2],
        colors[1],
        colors[2],
        colors[1],
      ],
      evenColors: [
        colors[1],
        colors[0],
        colors[1],
        colors[0],
      ],
    },
    // 04
    {
      oddColors: [
        colors[1],
        colors[2],
        colors[1],
        colors[2],
      ],
      evenColors: [
        colors[2],
        colors[1],
        colors[2],
        colors[1],
      ],
    },
    // 05
    {
      oddColors: [
        colors[1],
        colors[2],
        colors[1],
        colors[2],
      ],
      evenColors: [
        colors[2],
        colors[3],
        colors[2],
        colors[3],
      ],
    },
    // 06
    {
      oddColors: [
        colors[3],
        colors[2],
        colors[3],
        colors[2],
      ],
      evenColors: [
        colors[2],
        colors[3],
        colors[2],
        colors[3],
      ],
    },
    // 07
    {
      oddColors: [
        colors[2],
        colors[3],
        colors[2],
        colors[3],
      ],
      evenColors: [
        colors[3],
        colors[4],
        colors[3],
        colors[4],
      ],
    },
    // 08
    {
      oddColors: [
        colors[3],
        colors[4],
        colors[3],
        colors[4],
      ],
      evenColors: [
        colors[4],
        colors[3],
        colors[4],
        colors[3],
      ],
    },
    // 09
    {
      oddColors: [
        colors[4],
        colors[4],
        colors[4],
        colors[3],
      ],
      evenColors: [
        colors[4],
        colors[3],
        colors[4],
        colors[4],
      ],
    },
  ]
}

export default makeGridPatterns