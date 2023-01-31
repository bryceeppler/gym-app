// zustand in typescript
import {create} from 'zustand'
import { workouts } from '@prisma/client'
type State = {
    showWorkoutModal: boolean
    setShowWorkoutModal: (showWorkoutModal: boolean) => void
    selectedWorkout: workouts
    setSelectedWorkout: (selectedWorkout: workouts) => void
    showWorkoutHistoryModal: boolean
    setShowWorkoutHistoryModal: (showWorkoutHistoryModal: boolean) => void
    userId: number
    setUserId: (userId: number) => void


}

export const useWorkoutModalStore = create<State>((set) => ({
    showWorkoutModal: false,
    setShowWorkoutModal: (showWorkoutModal) => set({ showWorkoutModal }),
    selectedWorkout: {
        date: new Date(),
        title: '',
        id: 0,
        workout_str: '',
        workout_number: 0,
    },
    setSelectedWorkout: (selectedWorkout) => set({ selectedWorkout }),
    showWorkoutHistoryModal: false,
    setShowWorkoutHistoryModal: (showWorkoutHistoryModal) => set({ showWorkoutHistoryModal }),
    userId: 0,
    setUserId: (userId) => set({ userId })

}))

