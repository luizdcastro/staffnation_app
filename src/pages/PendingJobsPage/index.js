import React from "react";
import { connect } from "react-redux";
import { View, FlatList, Text, Image, StyleSheet } from "react-native";

import { getMe } from "../../redux/actions/getMeActions"
import JobCard from '../../components/JobCard'

const PendingJobsPage = ({ navigation, getme }) => {

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                {getme.data.jobsPending.length >= 1 ?
                    <FlatList
                        style={{ marginLeft: 10, }}
                        showsVerticalScrollIndicator={false}
                        data={getme.data.jobsPending}
                        renderItem={({ item }) => (
                            <JobCard
                                buttonTitle="Detalhes"
                                title={item.title}
                                category={item.category}
                                payment={item.payment.toFixed(2)}
                                day={item.date.split(' ')[0]}
                                month={item.date.split(' ')[1].substring(0, 3)}
                                image={item.image}
                                onPress={() => navigation.navigate('PendingJobDetailsPage', {
                                    jobId: item._id
                                })}
                            />
                        )}
                    />
                    :
                    <View style={styles.noContentBox}>
                        <Image source={require('../../assets/images/no-result-search.png')} style={styles.noContentImage} />
                        <Text style={styles.noContentText}>Você não possui trabalhos pendentes</Text>
                    </View>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#fafafa'
    },
    main: {
        backgroundColor: '#FAFAFA',
        backgroundColor: '#FAFAFA',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-end'
    },
    noContentBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noContentText: {
        fontSize: 16,
        fontFamily: 'NunitoSans_600SemiBold',
        color: '#484848',
        paddingTop: 30,
        marginBottom: '15%',
        color: 'grey'
    },
    noContentImage: {
        width: '50%',
        height: 160,
        resizeMode: "cover"
    },
});

const mapDispatchToProps = (dispatch) => ({
    dispatchGetMe: () => dispatch(getMe())
});

const mapStateToProps = (state) => ({
    getme: state.getme,
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingJobsPage);