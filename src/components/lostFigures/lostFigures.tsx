import React, { FC } from 'react';
import { Figure } from '../../models/figure';

interface Props {
    title: string;
    figures: Figure[];
}

const LostFigures: FC<Props> = ({title, figures}) => {
    return (
        <div className="lost">
            <p>{title}</p>

            {figures.map(figure => (
                <div key={figure.id}>
                    {figure.name}
        
                    {figure.logo && 
                        <img
                            width={20} 
                            height={20} 
                            src={figure.logo} 
                            alt=""
                        />
                    }
                </div>
            ))}
        </div>
    )
}

export default LostFigures;