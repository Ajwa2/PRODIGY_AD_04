import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Image, Pressable, StatusBar } from 'react-native';

const initialBoard = Array(9).fill(null);

const App = () => {
    const [board, setBoard] = useState(initialBoard);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [winner, setWinner] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        checkWinner();
    }, [board]);

    const checkWinner = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
    
        for (let [a, b, c] of lines) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setWinner(board[a]);
                setModalVisible(true);
                return;
            }
        }
    
        if (board.every(square => square)) {
            setWinner('draw');
        }
    };

    const handleSquarePress = (index) => {
        if (!board[index] && !winner) {
            const newBoard = [...board]; 
            newBoard[index] = isPlayerTurn ? 'X' : 'O';
            setBoard(newBoard); 
            setIsPlayerTurn(!isPlayerTurn); 
        }
    };

    const handleReset = () => {
        setBoard(initialBoard);
        setIsPlayerTurn(true);
        setWinner(null);
        setModalVisible(false); 
    };

    const handleCloseModal = () => {
        handleReset(); 
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'#324345'}/>
            <View style={styles.board}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => (
                    <TouchableOpacity
                        key={index}
                        style={styles.square}
                        onPress={() => handleSquarePress(index)}
                        disabled={!!board[index] || !!winner}
                    >
                        <Text style={[styles.squareText, { color: board[index] === 'X' ? '#0bb4c6' : '#E5C3A6' }]}>
                            {board[index] ? board[index] : ''}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.result}>
                {winner ? (winner === 'draw' ? "It's a draw!" : `Player ${winner} wins!`) : `Player ${isPlayerTurn ? 'X' : 'O'}'s turn`}
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleReset}>
                <Text style={styles.buttonText}>Reset Game</Text>
            </TouchableOpacity>

            {/* Custom Modal for Winner Announcement */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Congratulations!</Text>
                        <Text style={styles.modalMessage}>Player {winner} wins!</Text>
                        <Image
                            source={require('./assets/congrats.png')} 
                            style={styles.congratsImage}
                        />
                        <Pressable style={styles.button} onPress={handleCloseModal}>
                            <Text style={styles.buttonText}>OK</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#324345'
    },
    board: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 300,
        justifyContent: 'center',
        marginBottom: 20,
    },
    square: {
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: '#0bb4c6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    squareText: {
        fontSize: 36,
    },
    result: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#0bb4c6',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#0bb4c6',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'semibold',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalMessage: {
        fontSize: 16,
        marginVertical: 10,
    },
    congratsImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginVertical: 10,
    },
});

export default App;