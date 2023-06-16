import {ref} from "vue";
import UserRepository from '@/repositories/modules/users.repository'
export default function useUsers () {
    const users = ref([]);

    async function loadUsers() {
        UserRepository.getList()
            .then((response) => {
                users.value = response.data;
            })
    }

    return {
        users,
        loadUsers
    }
}