precision mediump float;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 mousePos = u_mouse / u_resolution;
    float distance = distance(vec2(0.5), st);

    float color = fract(distance * 10.0 - u_time) / distance / 40.0;
    vec3 color2 = vec3(.1, .5, 1.0);

    gl_FragColor = vec4(color2 * vec3(color), 1.0);
}