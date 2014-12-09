var test = require('tape')
var mat4 = require('gl-mat4')

var mix = require('./')

test('interpolates mat4', function(t){ 
    var start = mat4.identity([])
    var end = mat4.identity([])
    mat4.translate(end, end, [10, -50, 20])
    mat4.scale(end, end, [2, 4, 8])

    var out = []

    mix(out, start, end, 1)
    t.deepEqual(out, [ 2, 0, 0, 0, 0, 4, 0, 0, 0, 0, 8, 0, 10, -50, 20, 1 ])

    var res = mix(out, start, end, 0.5)
    t.deepEqual(out, [ 1.5, 0, 0, 0, 0, 2.5, 0, 0, 0, 0, 4.5, 0, 5, -25, 10, 1 ])
    t.equal(res, true, 'returns true if valid animation')

    end = mat4.scale([], mat4.create(), [0,0,0])
    res = mix(out, start, end, 0.5)
    t.equal(res, false, 'zero scale is not invertible')
    t.end()
})
