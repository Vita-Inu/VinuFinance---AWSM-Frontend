import {ModalBase} from "../modalBase";

type Props = {
    onClose: VoidFunction
}

export function WalletDescriptionModal({onClose}: Props) {
    return (
        <ModalBase title={'What is wallet?'} onClose={onClose}>
            <p>
                Fusce iaculis, orci nec vehicula blandit, felis mauris facilisis tellus, id interdum leo nibh eget urna.
                Suspendisse et eros sed nisl porttitor dapibus et quis velit. Mauris sodales eros justo, ut lobortis
                nibh suscipit sed. Nunc varius erat libero, quis lobortis lorem efficitur et. Etiam ac velit rhoncus,
                sagittis orci nec, sollicitudin turpis. Vestibulum lobortis a quam vitae faucibus. Morbi metus quam,
                aliquam nec nibh eget, dapibus viverra ipsum. Vestibulum tempor a ipsum facilisis venenatis. Sed mollis
                pretium eros, ut tempus dolor commodo quis. Nulla facilisi. Quisque ultrices lorem vitae efficitur
                consectetur. Sed laoreet dictum tellus id sagittis. Curabitur vestibulum augue vitae mi pharetra
                placerat.
            </p>
            <br/>
            <p>
                Fusce iaculis, orci nec vehicula blandit, felis mauris facilisis tellus, id interdum leo nibh eget urna.
                Suspendisse et eros sed nisl porttitor dapibus et quis velit. Mauris sodales eros justo, ut lobortis
                nibh suscipit sed. Nunc varius erat libero, quis lobortis lorem efficitur et. Etiam ac velit rhoncus,
                sagittis orci nec, sollicitudin turpis. Vestibulum lobortis a quam vitae faucibus. Morbi metus quam,
                aliquam nec nibh eget, dapibus viverra ipsum. Vestibulum tempor a ipsum facilisis venenatis. Sed mollis
                pretium eros, ut tempus dolor commodo quis. Nulla facilisi. Quisque ultrices lorem vitae efficitur
                consectetur. Sed laoreet dictum tellus id sagittis. Curabitur vestibulum augue vitae mi pharetra
                placerat.
            </p>
        </ModalBase>
    )
}