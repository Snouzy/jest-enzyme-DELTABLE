import React from 'react';
import { mount } from 'enzyme';
import App from './App';

describe('App', () => {
    let app = mount(<App />);

    it('should render the App title', () => {
        expect(app.find('h2').text()).toEqual('Note to Self');
    });

    it('renders the clear button', () => {
        expect(app.find('.btn').at(1).text()).toEqual('Clear Notes');
    });

    describe('when rendering the form', () => {
        it('creates a Form component', () => {
            expect(app.find('Form').exists()).toBe(true);
        });

        it('renders a FormControl component', () => {
            expect(app.find('FormControl').exists()).toBe(true);
        });

        it('it should render a submit button', () => {
            expect(app.find('.btn').at(0).text()).toEqual('Submit');
        });
    });

    describe('when creating a note', () => {
        let testNote = 'test note';

        beforeEach(() => {
            app.find('FormControl').simulate('change', {
                target: { value: testNote },
            });
        });

        it('should update the text in state', () => {
            expect(app.state().text).toEqual(testNote);
        });

        describe('when submitting a new note', () => {
            beforeEach(() => {
                app.find('.btn').at(0).simulate('click');
            });

            // reset
            afterEach(() => {
                app.find('.btn').at(1).simulate('click');
            });

            it('should add the new note to the state', () => {
                expect(app.state().notes[0].text).toEqual(testNote);
            });

            // for the cookies
            describe('and it should remount the component', () => {
                let app2;

                beforeEach(() => {
                    app2 = mount(<App />);
                });

                it('reads the stored note cookies', () => {
                    console.log(app2.state());
                    expect(app2.state().notes).toEqual([{ text: testNote }]);
                });
            });
        });

        describe('when clearing a note', () => {
            beforeEach(() => {
                app.find('.btn').at(1).simulate('click');
            });

            it('should clear the state', () => {
                // expect(app.state().notes.length).toEqual(0);
                expect(app.state().notes).toEqual([]);
            });
        });
    });
});
