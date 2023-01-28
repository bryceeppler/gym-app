// zustand in typescript
import {create} from 'zustand'

type State = {
    showWorkoutModal: boolean
    setShowWorkoutModal: (showWorkoutModal: boolean) => void
    selectedWorkout: {
        title?: string
        id: number
    }
    setSelectedWorkout: (selectedWorkout: {
        // title is optional
        title?: string
        id: number
    }) => void
    showWorkoutHistoryModal: boolean
    setShowWorkoutHistoryModal: (showWorkoutHistoryModal: boolean) => void


}

export const useWorkoutModalStore = create<State>((set) => ({
    showWorkoutModal: false,
    setShowWorkoutModal: (showWorkoutModal) => set({ showWorkoutModal }),
    selectedWorkout: {
        title: '',
        id: 0
    },
    setSelectedWorkout: (selectedWorkout) => set({ selectedWorkout }),
    showWorkoutHistoryModal: false,
    setShowWorkoutHistoryModal: (showWorkoutHistoryModal) => set({ showWorkoutHistoryModal })

}))

