import React, { FC } from 'react';

interface Props {
    message: string;
}

const Info: FC<Props> = ({message}) => {
    return (
        <h3>{message}</h3>
    )
}

export default Info;