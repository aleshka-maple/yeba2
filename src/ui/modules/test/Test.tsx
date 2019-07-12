import * as React from "react";
import {isEqual} from 'lodash';

export class Test extends React.Component {

    componentDidMount () {
        test();
    }

    render () {
        return (
            <section>
                Test
            </section>
        )
    }
}

function test () {
    const testString = 'aabaacaab';
    const expectedTree: ITree = {
        a: {
            a: {
                b: {
                    a: {
                        a: {
                            c: {
                                a: {
                                    a: {
                                        b: {

                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                c: {
                    a: {
                        a: {
                            b: {

                            }
                        }
                    }
                }
            },
            b: {
                a: {
                    a: {
                        c: {
                            a: {
                                a: {
                                    b: {

                                    }
                                }
                            }
                        }
                    }
                }
            },
            c: {
                a: {
                    a: {
                        b: {

                        }
                    }
                }
            }
        },
        b: {
            a: {
                a: {
                    c: {
                        a: {
                            a: {
                                b: {

                                }
                            }
                        }
                    }
                }
            }
        },
        c: {
            a: {
                a: {
                    b: {

                    }
                }
            }
        }
    };

    const resultTree = makeTree(testString);

    console.log(isEqual(resultTree, expectedTree));
}

interface ITree {
    [key: string]: ITree;
}

function makeTree (s: string): ITree {
    const result = {};

    let contexts = [result];

    for (let i = 0, last = s.length - 1; i <= last; i++) {
        const char = s[i];

        let nextContexts = [];
        if (result[char]) {
            nextContexts.push(result[char]);
            nextContexts.push(result[char]);
        } else {
            contexts.push(result);
        }

        contexts.forEach((context, index) => {
            if (!context[char]) context[char] = {};

            contexts[index] = context[char];
        });

        contexts = contexts.concat(nextContexts);
    }

    console.log(result);

    return result;
}