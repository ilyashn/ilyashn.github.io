<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container>
        <v-app-bar
                app
                color="white"

        >
            <v-toolbar-title class="headline .font-weight-bold ma-5">{{title}}</v-toolbar-title>
            <v-btn fab color="success" small class="ma-5" @click="createEvent = true">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-menu v-model="mainCalendarMenu" :close-on-content-click="false">
                <template v-slot:activator="{ on }">
                    <v-btn icon class="ma-5" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-date-picker :events="eventsArray" event-color="green darken-3" color="success" no-title v-model="focus" @input="mainCalendarMenu = false" ></v-date-picker>
            </v-menu>
        </v-app-bar>
        <v-row >
            <v-col>
                <v-row align="center" justify="center">
                    <v-btn
                            elevation="10"
                            depressed
                            x-large
                            :height="halfHeight"
                            color="success"
                            class="ma-5"
                            @click="prev"
                    >
                        <v-icon dark>mdi-chevron-left</v-icon>
                    </v-btn>

                    <v-sheet :height="height" :width="width" class="ma-5">
                        <v-calendar
                                color="success"
                                event-color="green darken-3"
                                type="day"
                                ref="calendar"
                                :events="events"
                                event-overlap-mode="column"
                                v-model="focus"
                                @change="updateRange"
                                @click:event="showEvent"
                        >
                        </v-calendar>
                        <v-menu
                                v-model="selectedOpen"
                                :close-on-content-click="false"
                                :activator="selectedElement"
                                offset-x
                                max-width="450px"
                        >
                            <v-card
                                    color="grey lighten-4"
                                    max-width="450px"
                            >
                                <v-toolbar
                                        :color="selectedEvent.color"
                                        dark
                                >
                                    <v-btn icon @click="openDialog">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <v-toolbar-title > {{ selectedEvent.name}}</v-toolbar-title>
                                    <v-spacer></v-spacer>

                                    <v-btn icon @click="deleteEvent">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-toolbar>
                                <v-card-text>
                                    <span> {{ selectedEvent.details }}</span>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn
                                            text
                                            color="secondary"
                                            @click="selectedOpen = false"
                                    >
                                        Cancel
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-menu>
                    </v-sheet>
                    <v-btn
                            elevation="10"
                            class="ma-5"
                            depressed
                            :height="halfHeight"
                            x-large
                            right
                            color="success"
                            @click="next"
                    >
                        <v-icon dark>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>

        <v-dialog persistent v-model="createEvent" max-width="700">
            <v-card>
                <v-card-title>
                    Create New Event
                </v-card-title>
                <v-card-text>
                    <v-text-field filled label="Name" class="mx-2" v-model="name" ></v-text-field>
                    <v-textarea filled label="Description" class="mx-2"  v-model="description" rows="2" auto-grow="true"></v-textarea>
                    <v-menu
                            ref="startTimePickerMenu"
                            v-model="startTimePickerMenu"
                            :close-on-content-click="false"
                            :return-value.sync="startTime"
                            transition="scale-transition"
                            offset-y
                            no-title
                            max-width="200px"
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    readonly
                                    class="mx-2"
                                    filled
                                    v-model="startTime"
                                    max-width="200px"
                                    label="Start time"
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-time-picker format="24hr" color="success" v-if="startTimePickerMenu" v-model="startTime" :max="endTime" @click:minute="$refs.startTimePickerMenu.save(startTime)"></v-time-picker>
                    </v-menu>
                    <v-menu
                            ref="endTimePickerMenu"
                            v-model="endTimePickerMenu"
                            :close-on-content-click="false"
                            :return-value.sync="endTime"
                            transition="scale-transition"
                            offset-y
                            no-title
                            max-width="200px"
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    readonly
                                    class="mx-2"
                                    filled
                                    v-model="endTime"
                                    max-width="200px"
                                    label="End time"
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-time-picker format="24hr" color="success" v-if="endTimePickerMenu" v-model="endTime" :min="startTime" @click:minute="$refs.endTimePickerMenu.save(endTime)" ></v-time-picker>
                    </v-menu>
                    <v-menu
                            v-model="creatingEventCalendarMenu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    readonly
                                    filled
                                    v-model="eventDate"
                                    label="Choose date"
                                    v-on="on"
                                    class="mx-2"
                            ></v-text-field>
                        </template>
                        <v-date-picker color="success" no-title v-model="eventDate" @input="creatingEventCalendarMenu = false"></v-date-picker>
                    </v-menu>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                            color="success"
                            depressed=""
                            @click="closeCreatingEventDialog"
                    >
                        Close
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="success"
                            depressed
                            :disabled="isDisabledSubmitButton"
                            @click="submit"
                    >
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>



        <v-dialog persistent v-model="editEvent" max-width="700">
            <v-card>
                <v-card-title>
                    Edit Event
                </v-card-title>
                <v-card-text>
                    <v-text-field filled label="Name" class="mx-2" v-model="editedName" ></v-text-field>
                    <v-textarea filled label="Description" class="mx-2" v-model="editedDescription" rows="2" auto-grow="true"></v-textarea>
                    <v-menu
                            ref="editedStartTimeMenu"
                            v-model="editedStartTimeMenu"
                            :close-on-content-click="false"
                            :return-value.sync="editedStartName"
                            transition="scale-transition"
                            offset-y
                            no-title
                            max-width="200px"
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    readonly
                                    class="mx-2"
                                    filled
                                    v-model="editedStartName"
                                    max-width="200px"
                                    label="Start time"
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-time-picker format="24hr" color="success" v-if="editedStartTimeMenu" v-model="editedStartName" :max="editedEndTime" @click:minute="$refs.editedStartTimeMenu.save(editedStartName)"></v-time-picker>
                    </v-menu>
                    <v-menu
                            ref="editedEndTimeMenu"
                            v-model="editedEndTimeMenu"
                            :close-on-content-click="false"
                            :return-value.sync="editedEndTime"
                            transition="scale-transition"
                            offset-y
                            no-title
                            max-width="200px"
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    readonly
                                    class="mx-2"
                                    filled
                                    v-model="editedEndTime"
                                    max-width="200px"
                                    label="End time"
                                    v-on="on"
                            ></v-text-field>
                        </template>
                        <v-time-picker format="24hr" color="success" v-if="editedEndTimeMenu" v-model="editedEndTime" :min="editedStartName" @click:minute="$refs.editedEndTimeMenu.save(editedEndTime)"></v-time-picker>
                    </v-menu>
                    <v-menu
                            v-model="editedEventDateMenu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    readonly
                                    filled
                                    v-model="editedEventDate"
                                    label="Choose date"
                                    v-on="on"
                                    class="mx-2"
                            ></v-text-field>
                        </template>
                        <v-date-picker color="success" no-title v-model="editedEventDate" @input="editedEventDateMenu = false"></v-date-picker>
                    </v-menu>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                            color="success"
                            depressed=""
                            @click="closeEditingEventDialog"
                    >
                        Close
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="success"
                            depressed
                            :disabled="isDisabledSaveButton"
                            @click="save"
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            description: undefined,
            editedDescription: undefined,
            eventDate: undefined,
            editedEventDate: undefined,
            name: undefined,
            editedName: undefined,
            startTime: undefined,
            editedStartName: undefined,
            endTime: undefined,
            editedEndTime: undefined,
            mainCalendarMenu: false,
            creatingEventCalendarMenu: false,
            height: document.documentElement.clientHeight /1.3,
            width: document.documentElement.clientWidth / 1.8,
            halfHeight: document.documentElement.clientHeight/ 2.5,
            focus: "",
            start: null,
            end: null,
            createEvent: false,
            editEvent: false,
            events: [],
            startTimePickerMenu:false,
            endTimePickerMenu: false,
            editedStartTimeMenu: false,
            editedEndTimeMenu: false,
            editedEventDateMenu: false,
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            eventsArray: [],
        }),
        computed: {
            isDisabledSubmitButton() {
                return !(this.startTime !== undefined && this.name !== undefined && this.name.trim() !== ''&& this.endTime !== undefined && this.eventDate !== undefined);
            },

            isDisabledSaveButton() {
                return !(this.editedStartName !== undefined && this.editedName !== undefined && this.editedName.trim() !== ''&& this.editedEndTime !== undefined && this.editedEventDate !== undefined);
            },
            title () {
                const {start} = this;
                if (start === null) {

                    return ''
                }
                let startMonth = this.start.month;
                if (startMonth < 10) {

                    startMonth = `0${startMonth}`;
                }
                const startYear = start.year;
                let startDay = start.day;
                if (startDay < 10) {
                    startDay = `0${startDay}`;
                }
                return `${startDay}.${startMonth}.${startYear}`
            },
        },

        mounted: function () {
            this.events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
            this.eventsArray = localStorage.getItem('eventsArray') ? JSON.parse(localStorage.getItem('eventsArray')) : [];
        },
        methods: {
            save() {
                this.deleteEvent();
                let startHour = parseInt(this.editedStartName.substr(0, 2));
                let startMinutes = parseInt(this.editedStartName.substr(3, 2));
                let endHour = parseInt(this.editedEndTime.substr(0, 2));
                let endMinutes = parseInt(this.editedEndTime.substr(3, 2));
                let year = parseInt(this.editedEventDate.substr(0, 4));
                let month = parseInt(this.editedEventDate.substr(5, 2));
                let day = parseInt(this.editedEventDate.substr(8, 2));
                let eventStart = new Date(Date.UTC(year, month - 1, day, startHour, startMinutes, 0)).toISOString().substring(0, 19);
                let eventEnd = new Date(Date.UTC(year, month - 1, day, endHour, endMinutes, 0)).toISOString().substring(0, 19);

                this.events.push({
                    name: this.editedName,
                    start: eventStart,
                    end: eventEnd,
                    color: 'green',
                    details: this.editedDescription
                });
                this.eventsArray.push(this.editedEventDate);

                localStorage.setItem('events', JSON.stringify(this.events));
                localStorage.setItem('eventsItem', JSON.stringify(this.eventsArray));
                this.closeEditingEventDialog();
            },
            openDialog() {
                this.editEvent = true;
                this.editedName = this.selectedEvent.name;
                this.editedDescription = this.selectedEvent.details;
                this.editedStartName = this.selectedEvent.start.substr(11, 5);
                this.editedEndTime = this.selectedEvent.end.substr(11, 5);
                this.editedEventDate = this.selectedEvent.start.substr(0, 10);
            },
            showEvent({ nativeEvent, event }) {
                const open = () => {
                    this.selectedEvent = event;
                    this.selectedElement = nativeEvent.target;
                    setTimeout(() => this.selectedOpen = true, 10)
                };

                if (this.selectedOpen) {
                    this.selectedOpen = false;
                    setTimeout(open, 10)
                } else {
                    open()
                }
                nativeEvent.stopPropagation();
            },
            submit() {
                let startHour = parseInt(this.startTime.substr(0, 2));
                let startMinutes = parseInt(this.startTime.substr(3, 2));
                let endHour = parseInt(this.endTime.substr(0, 2));
                let endMinutes = parseInt(this.endTime.substr(3, 2));
                let year = parseInt(this.eventDate.substr(0, 4));
                let month = parseInt(this.eventDate.substr(5, 2));
                let day = parseInt(this.eventDate.substr(8, 2));
                let eventStart = new Date(Date.UTC(year, month - 1, day, startHour, startMinutes, 0)).toISOString().substring(0, 19);
                let eventEnd = new Date(Date.UTC(year, month - 1, day, endHour, endMinutes, 0)).toISOString().substring(0, 19);

                this.events.push({
                    name: this.name,
                    start: eventStart,
                    end: eventEnd,
                    color: 'green',
                    details: this.description
                });
                this.eventsArray.push(this.eventDate);
                localStorage.setItem('events', JSON.stringify(this.events));
                localStorage.setItem('eventsArray', JSON.stringify(this.eventsArray));
                this.closeCreatingEventDialog();
            },

            prev() {
                this.$refs.calendar.prev()
            },
            next() {
                this.$refs.calendar.next()
            },
            updateRange ({ start, end }) {

                this.start = start;
                this.end = end;
            },
            closeCreatingEventDialog() {
                this.createEvent = false;
                this.startTime = undefined;
                this.name = undefined;
                this.endTime = undefined;
                this.eventDate = undefined;
                this.description = undefined;

            },
            closeEditingEventDialog() {
                this.editEvent = false;
                this.editedStartName = undefined;
                this.editedName = undefined;
                this.editedEndTime = undefined;
                this.editedEventDate = undefined;
                this.editedDescription = undefined;
                this.selectedOpen = false;
            },

            deleteEvent() {
                const index = this.events.indexOf(this.selectedEvent);
                this.events.splice(index, 1);
                const index1 = this.eventsArray.indexOf(this.selectedEvent.start.substr(0, 10));
                this.selectedOpen = false;
                this.selectedEvent = {};
                this.selectedElement =  null;
                this.selectedOpen = false;
                this.eventsArray.splice(index1, 1);
                localStorage.setItem('events', JSON.stringify(this.events));
                localStorage.setItem('eventsArray', JSON.stringify(this.eventsArray));
            },
        }
    }
</script>