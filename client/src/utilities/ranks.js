export default function (doneTodos) {
  switch(doneTodos.length) {
    case doneTodos.length > 1: 
      return 'Todo Novice'
    default:
      return 'Novice'
  }
}
