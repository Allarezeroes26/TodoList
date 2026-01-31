import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { taskStore } from '../stores/taskStore'
import { Check, Loader, PenLine, Trash } from 'lucide-react'
import { formatDueDate } from '../timeFormat/formatTime'

const Task = () => {
  const { id } = useParams();
  const { task, getTask } = taskStore();

  useEffect(() => {
    getTask(id)
  }, [id, getTask])

  if (!task) return <div className='flex items-center justify-center'>
    <Loader className='animate-spin'/>
  </div>

  return (
    <div className='flex flex-1 gap-10 font-paragraph flex-col lg:mx-20 justify-between'>
      <div className='glass flex flex-col lg:flex-row min-h-[30vh] p-8 items-baseline lg:items-center gap-5 lg:justify-between py-10 lg:px-10 bg-primary w-full rounded-2xl'>
        <div>
          <div className='flex flex-col w-full'>
            <h1>Task Title: </h1>
            <h1 className='text-3xl lg:text-4xl font-bold font-paragraph'>{task.title.toUpperCase()}</h1>
          </div>
          <div className='flex mt-3'>
            <h1>Due Date: <span className='font-bold'>{formatDueDate(task.dueDate)}</span></h1>
          </div>
        </div>
        <div className='items-center flex flex-row gap-3 justify-center'>
          <div className='tooltip' data-tip='Complete Task?'>
            <button className='btn rounded-full'><Check /></button>
          </div>
          <div className='tooltip' data-tip='Update Task?'>
            <button className='btn rounded-full'><PenLine /></button>
          </div>
        </div>
      </div>
      <div className='flex gap-5 flex-col w-full'>
        <h1 className='text-lg'>Description: </h1>
        <div className='w-full bg-base-200 py-5 px-3'>
          <p>{task.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Task
