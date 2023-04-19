import React, { useState } from 'react';
import moment from 'moment';
import './classes.css';


const Reports = ({ appointmentData }) => {

    const [startDate, setStartDate] = useState(moment('2023-03-01'));
    const [endDate, setEndDate] = useState(moment('2023-07-01'));
    const [selectedType, setSelectedType] = useState('');
    const [reportType, setReportType] = useState('number-of-appointments');

    const therapyTypes = ['Stretching', 'Cryotherapy', 'Strengthening', 'Surgical rehabilitation', 'Conditioning'];


    const filteredAppointments = appointmentData.filter(appointment => {
        const appointmentStartDate = moment(appointment.appointmentStartDate);
        return (
            appointmentStartDate.isSameOrAfter(startDate, 'day') &&
            appointmentStartDate.isSameOrBefore(endDate, 'day'));
    });


    const dateFiltered = appointmentData.filter(appointment => {
        return ((!selectedType || appointment.therapyType === selectedType) &&
            (therapyTypes.includes(appointment.therapyType))
        )
    })

    const getTopTherapists = () => {
        const therapistsMap = {};
        appointmentData.forEach(appointmentData => {
            const therapist = `${appointmentData.therapistFirstName} ${appointmentData.therapistLastName}`;
            if (therapist in therapistsMap) {
                therapistsMap[therapist]++;
            } else {
                therapistsMap[therapist] = 1;
            }
        });
        const therapists = Object.entries(therapistsMap);
        therapists.sort((a, b) => b[1] - a[1]);
        return therapists.slice(0, 10);
    };

    const getNumberOfAppointmentsByCustomer = () => {
        const customersMap = {};
        appointmentData.forEach(appointmentData => {
            const customer = `${appointmentData.firstName} ${appointmentData.lastName}`;
            if (customer in customersMap) {
                customersMap[customer]++;
            } else {
                customersMap[customer] = 1;
            }
        });
        return Object.entries(customersMap);
    };

    const handleStartDateChange = e => {
        setStartDate(moment(e.target.value));
    };

    const handleEndDateChange = e => {
        setEndDate(moment(e.target.value));
    };

    const handleTypeChange = e => {
        setSelectedType(e.target.value);
    };

    const handleReportTypeChange = e => {
        setReportType(e.target.value);
    };

    const getNumberOfAppointmentsByTherapyType = () => {
        const appointmentsByTherapyType = appointmentData.reduce((acc, appointment) => {
            if (appointment.therapyType in acc) {
                acc[appointment.therapyType]++;
            } else {
                acc[appointment.therapyType] = 1;
            }
            return acc;
        }, {});

        const sortedAppointmentsByTherapyType = Array.from(
            Object.entries(appointmentsByTherapyType),
            ([therapyType, count]) => ({ therapyType, count })
        ).sort((a, b) => b.count - a.count);

        return sortedAppointmentsByTherapyType;
    };


    return (
        <div className="reports-container">
            <h1>Reports</h1>
            <div className="reports-options">
                <div className="report-type">
                    <label htmlFor="reportType">Report Type:</label>
                    <select id="reportType" value={reportType} onChange={handleReportTypeChange}>
                        <option value="number-of-appointments">Number of Appointments</option>
                        <option value="top-therapists">Top Physical Therapists</option>
                        <option value="physical-therapy-type">Number of Appointments by Therapy Type</option>
                        <option value="number-of-appointments-by-customers">Number of Appointments by Customers</option>
                    </select>
                </div>

                {reportType === 'number-of-appointments' && (
                    <div className="date-range">
                        <label htmlFor="startDate">Start Date:</label>
                        <input type="date" id="startDate" value={startDate.format('YYYY-MM-DD')} onChange={handleStartDateChange} />
                        <label htmlFor="endDate">End Date:</label>
                        <input type="date" id="endDate" value={endDate.format('YYYY-MM-DD')} onChange={handleEndDateChange} />
                    </div>
                )}

                {reportType === 'physical-therapy-type' && (

                    <div className="physical-therapy-type">
                        <label htmlFor="type">Physical Therapy Type:</label>
                        <select id="type" value={selectedType} onChange={handleTypeChange}>
                            <option value="">All</option>
                            <option value="Stretching">Stretching</option>
                            <option value="Cryotherapy">Cryotherapy</option>
                            <option value="Strengthening">Strengthening</option>
                            <option value="Surgical rehabilitation">Surgical rehabilitation</option>
                            <option value="Conditioning">Conditioning</option>
                        </select>
                        <br />
                        {selectedType === "" ? <>
                            <h2>Appointments by Therapy Type</h2>
                            <ul>
                                {getNumberOfAppointmentsByTherapyType().map(({ therapyType, count }) => (
                                    <li key={therapyType}>
                                        {therapyType}: {count}
                                    </li>
                                ))}
                            </ul>
                        </> : selectedType + ": " + dateFiltered.length}
                    </div>

                )}
            </div>
            <div className="reports-results">
                {reportType === 'number-of-appointments' && (
                    <div className="appointments-count">
                        <h2>Number of Appointments</h2>
                        <p>
                            From <strong>{startDate.format('MMMM D, YYYY')}</strong> to{' '}
                            <strong>{endDate.format('MMMM D, YYYY')}</strong>
                        </p>
                        <p>Number of appointments: {filteredAppointments.length}</p>
                    </div>
                )}
                {reportType === 'top-therapists' && (
                    <div className="top-therapists">
                        <h2>Top Physical Therapists</h2>
                        <div>
                            <div>
                                <span>Therapist Name & Number of Appointments</span>
                            </div>
                            {getTopTherapists().map(([therapist, count]) => (
                                <div key={therapist}>
                                    <span>{therapist}</span>
                                    <span style={{ paddingLeft: "50px" }}>{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {reportType === 'number-of-appointments-by-customers' && (
                    <div className="appointments-by-customers">
                        <h2>Number of Appointments by Customers</h2>
                        <div>
                            <div>
                                <span>Customer</span>
                                <span>Number of Appointments</span>
                            </div>
                            <div>
                                {getNumberOfAppointmentsByCustomer().map(([customer, count]) => (
                                    <div key={customer}>
                                        {`${customer}  `}
                                        {count}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Reports;