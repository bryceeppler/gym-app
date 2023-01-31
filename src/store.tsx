// zustand in typescript
import {create} from 'zustand'
import { users, workouts } from '@prisma/client'
type State = {
    showWorkoutModal: boolean
    setShowWorkoutModal: (showWorkoutModal: boolean) => void
    showActivityModal: boolean
    setShowActivityModal: (showActivityModal: boolean) => void
    selectedWorkout: workouts
    setSelectedWorkout: (selectedWorkout: workouts) => void
    showWorkoutHistoryModal: boolean
    setShowWorkoutHistoryModal: (showWorkoutHistoryModal: boolean) => void
    userId: number
    setUserId: (userId: number) => void
    currentUser: users
    setCurrentUser: (currentUser: users) => void

}

export const useWorkoutModalStore = create<State>((set) => ({
    showWorkoutModal: false,
    showActivityModal: false,
    setShowActivityModal: (showActivityModal) => set({ showActivityModal }),
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
    setUserId: (userId) => set({ userId }),
    currentUser: {
        id: 0,
        username: '',
        completedWorkouts: [],
        icePlunges:[],
        cardioSessions: []
    },
    setCurrentUser: (currentUser) => set({ currentUser })

}))

