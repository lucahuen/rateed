import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const QuestionBox = ({ text, onRatingChange }) => {
    const [rating, setRating] = useState(5); // Standardmäßig 5 Sterne

    const handleStarClick = (index) => {
        setRating(index + 1);
        onRatingChange(index + 1);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                padding: '20px',
            }}
        >
            <Typography variant="h6" sx={{ marginRight: '10px' }}>
                {text}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {Array.from({ length: 5 }, (_, index) => (
                    <StarIcon
                        key={index}
                        onClick={() => handleStarClick(index)}
                        style={{
                            color: index < rating ? 'gold' : 'lightgray',
                            fontSize: '40px',
                            transition: 'color 0.2s ease',
                            cursor: 'pointer', // Fügt den Click-Pointer hinzu
                        }}
                    />
                ))}
                <Typography variant="h6" sx={{ marginLeft: '10px' }}>
                    {rating} / 5
                </Typography>
            </Box>
        </Box>
    );
};

export default QuestionBox;
