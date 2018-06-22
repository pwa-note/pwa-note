import Index from '../components/Index'
import { connect, getState } from '../store'

export default connect(() => {
    const { status } = getState()
    return {
        status
    }
})(Index);
