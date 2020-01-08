import * as React from "react";
import {isEqual, map} from 'lodash';
import './test.less';

const colorList = [
    'E08B79',
    '5A2636',
    '2A5A26',
    '829381',
    '3CE3B5',
    '3CD1E3',
    '3C85E3',
    '6C3CE3',
    'B03CE3',
    'E33CB5',
    'E33C6F',
];

export class Test extends React.Component {

    colorMap: Map<string, string> = new Map();

    render () {
        return (
            <section className="test-section">
                {
                    [testSort(4), testSort(3), testSort(1), testSort(0)].map(
                        (config: any) => {
                            return map(config, (value, key) => (
                                <div key={key} className="test-option">
                                    <label
                                        className={`test-option-label ${key === 'isPassed' ? value ? 'passed' : 'not-passed' : ''}`}>
                                        {key === 'numberOfComparisons' ? value : key}
                                    </label>
                                    <span className="test-option-result">
                                        {
                                            Array.isArray(value) ?
                                                value.map((obj, index) => {
                                                    let color = null;
                                                    const id = JSON.stringify(obj);
                                                    if (this.colorMap.has(id)) {
                                                        color = this.colorMap.get(id);
                                                    } else {
                                                        this.colorMap.set(id, colorList[index]);
                                                        color = colorList[index];
                                                    }
                                                    return (
                                                        <span key={color}
                                                              style={{backgroundColor: `#${color}`, color: '#fff'}}>
                                                            {`num: ${obj.num} status: ${obj.status}`}
                                                        </span>
                                                    )
                                                }) : null
                                        }
                                    </span>

                                </div>
                            ))
                        }
                    )
                }
            </section>
        )
    }
}

function testSort (status: number) {
    const src = [{num: 1, status: 4}, {num: 2, status: 3}, {num: 3, status: 4}, {num: 4, status: 0}, {num: 5, status: 1}, {num: 6, status: 1}];
    console.log(status);
    let numberOfComparisons = 0;
    const result = src.concat().sort((a, b) => {

        const result = a.status === b.status ? 0 : a.status === status ? -1 : b.status === status ? 1 : 0;
        console.log(a, b, result);
        numberOfComparisons++;
        return result;
    });
    console.log('__________________');
    let expected = [];
    if (status === 4) {
        expected = [{num: 1, status: 4}, {num: 3, status: 4}, {num: 2, status: 3}, {num: 4, status: 0}, {num: 5, status: 1}, {num: 6, status: 1}];
    }
    if (status === 3) {
        expected = [{num: 2, status: 3}, {num: 1, status: 4}, {num: 3, status: 4}, {num: 4, status: 0}, {num: 5, status: 1}, {num: 6, status: 1}];
    }
    if (status === 1) {
        expected = [{num: 5, status: 1}, {num: 6, status: 1}, {num: 1, status: 4}, {num: 2, status: 3}, {num: 3, status: 4}, {num: 4, status: 0}];
    }
    if (status === 0) {
        expected = [{num: 4, status: 0}, {num: 1, status: 4}, {num: 2, status: 3}, {num: 3, status: 4}, {num: 5, status: 1}, {num: 6, status: 1}];
    }
    return {
        src,
        result,
        expected,
        numberOfComparisons,
        isPassed: isEqual(result, expected)
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

    return isEqual(resultTree, expectedTree);
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